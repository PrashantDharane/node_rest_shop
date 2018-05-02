const mongoose = require('mongoose');
const itemImages = require('./itemImages');

const Schema = mongoose.Schema;

const regionalItemSchema = Schema({
    _id : mongoose.Schema.Types.ObjectId,
    item_master_id : mongoose.Schema.Types.ObjectId,
    regional_catlog_id : mongoose.Schema.Types.ObjectId,
    style_code_id : mongoose.Schema.Types.ObjectId,
    item_base_price : Number,
    base_currency : String,
    rating : Number,
    no_of_rating : Number,
    max_qty_allowed : Number,
    tags : [String],
    availability : [String],
    peak_months : [String],
    peak_overhead : Number,
    scarcity_overhead : Number,
    platform_charges : Number,
    platform_discount_applicable : Boolean,
    status : String,
    category_id : String,
    images : itemImages
});

module.exports = mongoose.model('RegionalItem',regionalItemSchema,'regional_items');