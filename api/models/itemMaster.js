const mongoose = require('mongoose');
const itemImages = require('./itemImages');

const addOnSchema = mongoose.Schema({
    categories : [String],
    sub_categories : [String],
    properties : [String]
});




const multiLingualItemInformationSchema = mongoose.Schema({
    lang : String,
    data : {
        item_name : String,
        item_model_number : String,
        main_category : String,
        search_key_word : [String],
        item_type : String,
        delivery_instruction : String,
        properties : mongoose.Schema.Types.Mixed
    }
});

const itemInfoSchema = mongoose.Schema({
    images : itemImages,
    multiLingualItemInfo : [multiLingualItemInformationSchema]
});

const itemMasterSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    country_code : String,
    country_name : String,
    item_code : String,
    organization_id : String,
    listing_date : Date,
    update_date : Date,
    item_length : Number,
    item_width : Number,
    item_height : Number,
    item_weight : Number,
    item_condition : String,
    item_group_id : String,
    item_style_code : String,
    item_type : String,
    currency : String,
    category_id : String,
    add_on : addOnSchema,
    average_rating : Number,
    no_of_rating : Number,
    item_info : itemInfoSchema,
    max_qty_allowed : Number
});


module.exports = mongoose.model('ItemMaster',itemMasterSchema,'item_master');