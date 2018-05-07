const mongoose = require('mongoose');

const sellerItem = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    seller_id : mongoose.Schema.Types.ObjectId,
    regional_item_id : mongoose.Schema.Types.ObjectId,
    mrp : Number,
    selling_price : Number,
    selling_price_backup : Number,
    quantity : Number,
    discount_percent : Number,
    discount_price : Number,
    auto_match_price : Boolean,
    auto_match_threshold : Number,
    organisation_id :String
});

module.exports = mongoose.model('SellerItem',sellerItem,'seller_items');