class RegionalCategoryHierarchyPreProcessor {
    constructor(hierarchy){
        this.hierarchy = hierarchy;
    }

    getCategoryIdToNameMaps() {
        var categoryIdToName = new Map();

        this.hierarchy.sub_categories.forEach(element => {
            categoryIdToName = drillDownCategoryIdToNameMap(element);            
        });

    
        var nameTemp = {};
        this.hierarchy.category.names.forEach(element => {
            nameTemp[element.lang] = element.name;
        })
        categoryIdToName[this.hierarchy.category_id] = nameTemp;
        return categoryIdToName;
    }

    getflattenedTree() {
        var flattenedTree = new Map();
        flattenedTree = generateFlattenTree(this.hierarchy.sub_categories);
        flattenedTree[this.hierarchy.category_id] = Object.keys(flattenedTree);
        return flattenedTree;
    }

    getFilterMap() {
        var filterMap = {};
        this.hierarchy.sub_categories.forEach(element => {
            filterMap = drillDownFilterMap(element);            
        });
        filterMap[this.hierarchy.category_id] = this.hierarchy.filter_details_id; 
        return filterMap;
    }

    getflattenedTreeDependent() {
        var flattenedTreeDependentTemp = {};
        this.hierarchy.sub_categories.forEach(element => {
            flattenedTreeDependentTemp = generateFlattenTreeDependent(element);            
        });
        flattenedTreeDependentTemp[this.hierarchy.category_id] = []; 

        this.hierarchy.sub_categories.forEach(element => {
            flattenedTreeDependentTemp[this.hierarchy.category_id].push(element.category_id); 
        });
        return flattenedTreeDependentTemp;
    }

    getParentTree() {
        var parentTree = {};
        var flattenedTreeDependentTemp = this.getflattenedTreeDependent();
        
        for(var x in flattenedTreeDependentTemp) {
            flattenedTreeDependentTemp[x].forEach(category => {
                parentTree[category] = x;
            });
        };
        return parentTree;
    }

    getLeafs() {
        var leafs = [];

        this.hierarchy.sub_categories.forEach(element => {
            leafs = drillDown(element)
        });
        return leafs;
    }

    getHierarchyWithMetadata(){
        this.hierarchy.parentTree = this.getParentTree();
        this.hierarchy.flattenedTree = this.getflattenedTree();
        this.hierarchy.flattenedTreeDependent = this.getflattenedTreeDependent();
        this.hierarchy.leafs = this.getLeafs();
        this.hierarchy.filterMap = this.getFilterMap();
        this.hierarchy.categoryIdToName = this.getCategoryIdToNameMaps();
        return this.hierarchy;
    }
}

//Category to name map UTIL
var categoryIdToName = {};

var drillDownCategoryIdToNameMap = (subCategory) => {
    var nameTemp = {};
    subCategory.names.forEach(element => {
        nameTemp[element.lang] = element.name;
    });
    categoryIdToName[subCategory.category_id] = nameTemp;
    
    subCategory.sub_categories.forEach(element => {
        drillDownCategoryIdToNameMap(element);
    });
    return categoryIdToName;
}

// Filter Map 
var filterMap = {};
var drillDownFilterMap = (subCategory) => {
    filterMap[subCategory.category_id] = subCategory.filter_details_id; 
    subCategory.sub_categories.forEach(element => {
        drillDownFilterMap(element);
    });
    return filterMap;
}
//getLeafs UTIL
var leafs = [];
var drillDown = (subCategory) => {
    if(subCategory.sub_categories.length > 0){
        subCategory.sub_categories.forEach(element => {
            drillDown(element);
        });
    }else {
        leafs.push(subCategory.category_id);
    }
    return leafs;
}

// FLATTEND TREE DEPENDENT LOGIC
var flattenedTreeDependent = {};

var generateFlattenTreeDependent = (subCategory) => {
    if(subCategory.sub_categories.length > 0) {
        subCategory.sub_categories.forEach(element => {
            if(!flattenedTreeDependent[subCategory.category_id]){
                flattenedTreeDependent[subCategory.category_id] = [];    
            }
            flattenedTreeDependent[subCategory.category_id].push(element.category_id);
            generateFlattenTreeDependent(element);            
        });
    }else {
        flattenedTreeDependent[subCategory.category_id] = [];
    }
    return flattenedTreeDependent;
}
// FLATTENED TREE LOGIC
var flattenedTree = {};
var generateFlattenTree = (subCategories)=>{
    subCategories.forEach(element => {
        flattenedTree[element.category_id] = getAllChildren(element.sub_categories,[]);
        if(element.sub_categories.length > 0){
            generateFlattenTree(element.sub_categories)
        }
    });
    return flattenedTree;
}

var getAllChildren = (subCategories,pool) => {
        subCategories.forEach(element => {
            pool.push(element.category_id);
            if (element.sub_categories.length > 0) {
                getAllChildren(element.sub_categories,pool);                                    
            }
        });
    return pool;
}



module.exports = RegionalCategoryHierarchyPreProcessor;