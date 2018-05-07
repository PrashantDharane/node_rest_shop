const mongoose  = require('mongoose');
const RegionalItem = require('../models/regionalItem');

const regionalItemService =  {
    findById : (id) => {
        return RegionalItem
            .findById(id)
            .exec();
    },
    findRegionalItemsBySubCategory : (regionalCatalogueIds,subCategories,tags,limit) => {
        
        if(!Array.isArray(regionalCatalogueIds)){
            throw new Error("Argument 1: must be an Array!");
        }
        if(subCategories){
            if (!Array.isArray(subCategories)) {
                throw new Error("Argument 2: is not an Array!")
            }         
        }

        const filter = {};
        filter.regional_catlog_id = {
                                        $in : regionalCatalogueIds
                                    };
        if (subCategories) {
            filter.category_id = {
                $in : subCategories
            };
        }
        if (tags) {
            filter.tags = {
                $in : tags
            };
        }
        return RegionalItem
            .find(filter)
            .limit(limit)
            .exec();
    },
    findTopRatedRegionalItem : (regionalCatalogueIds) => {
        if(!Array.isArray(regionalCatalogueIds)){
            throw new Error("Argument 1: must be an Array!");
        }
        return RegionalItem
        .find({
            regional_catlog_id : {
                $in : regionalCatalogueIds
            }
        })
        .limit()
        .sort({
            rating : -1
        })
        .exec();
    },
    findMaxMinPrice : (regionalCatalogueIds,subCategories) => {
        if(!Array.isArray(regionalCatalogueIds)){
            throw new Error("Argument 1: must be an Array!");
        }
        
        const match = {
                        $match : {
                            regional_catlog_id : { $in : regionalCatalogueIds }
                        }
                    };
        
        if(subCategories){
            if (Array.isArray(subCategories)) {
                match.$match.category_id = { $in : subCategories };                
            }else {
                throw new Error("Argument 2: is not an Array!")
            }         
        }
        console.log("Inside Service: "+subCategories);            

        return RegionalItem
        .aggregate([
            match,
            {
                $group :{
                    _id : null,
                    max : {
                        $max : '$item_base_price'
                    },
                    min : {
                        $min : '$item_base_price'
                    }
                }
            }
        ])
        .exec();
    }
};

module.exports = regionalItemService;