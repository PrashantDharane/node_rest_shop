const mongoose = require('mongoose');
const Region = require('./region');

const regionalCatlogs = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    country_code : String,
    country_name : String,
    region_name : String,
    description : String,
    organization : String,
    created_at : Date,
    status : String,
    base_currency : String,
    return_policy : Number,
    regions : Region,
    category_id : String,
    subCategory_id : String
});

module.exports = mongoose.model('RegionalCatlogs',regionalCatlogs,'regional_catlogs');