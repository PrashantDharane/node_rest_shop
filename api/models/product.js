const mongoose = require('mongoose');


const addOnSchema = mongoose.Schema({
    categories : [String],
    sub_categories : [String],
    properties : [String]
});


const imagesSchema = mongoose.Schema({
    main_image_url : String,
    sub_image_url : [String]
});


const multiLingualItemInformation = mongoose.Schema({
    item_name : String,
    item_model_number : String,
    main_category : String,
    search_key_word : [String],
    item_type : String,
    delivery_instruction : String,
    properties : [String]
});

const itemInfoSchema = mongoose.Schema({
    images : imagesSchema,
    en : multiLingualItemInformation,
    ar : multiLingualItemInformation
});

const productSchema = mongoose.Schema({
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
    item_info : mongoose.Schema.Types.Mixed,
    max_qty_allowed : Number
});



module.exports = mongoose.model('Product',productSchema); 





// const mongoose = require('mongoose');

// const productSchema = mongoose.Schema({
//     _id : mongoose.Schema.Types.ObjectId,
//     name : String,
//     price : Number
// });

// module.exports = mongoose.model('Product',productSchema);

