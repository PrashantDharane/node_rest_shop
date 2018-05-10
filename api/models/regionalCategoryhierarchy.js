const mongoose = require('mongoose');
const RegionSchema = require('./region');

const CategoryNameMultiLingual = mongoose.Schema({
    names : [mongoose.Schema({
        lang : String,
        name : String
    })]
});

const SubCategory = new mongoose.Schema();
SubCategory.add({
    status : String,
    site_map : String,
    target_page_id :String,
    page_instance_id : String,
    names : [mongoose.Schema({
        lang : String,
        name : String
    })],
    category_id : String,
    sub_categories : [SubCategory]
})

const regionalCategoryHierarchy = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    description : String,
    country_id : String,
    regions : RegionSchema,
    status : String,
    organisation_id : String,
    updated_date : Date,
    category_image_url : String,
    sequence : Number,
    category_advertisement : mongoose.Schema({
        advertisement_url : String,
        targetPageId : String,
        pageInstanceId : String
    }),
    filter_details_id : mongoose.SchemaTypes.ObjectId,
    category : CategoryNameMultiLingual,
    sub_categories : [SubCategory]
});


module.exports = mongoose.model('RegionalCategoryHierarchy',regionalCategoryHierarchy,'regional_category_hierarchy');