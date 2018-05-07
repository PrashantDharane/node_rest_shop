const mongoose = require('mongoose');
const SellerItem = require('../models/sellerItem');

const sellerItemService = {
    findSellerItems : (regionalItemIds,limit) => {
        return SellerItem
            .find({
                regional_item_id : {
                    $in : regionalItemIds
                }
            })
            .limit(limit)
            .exec();
    }
};

module.exports = sellerItemService;