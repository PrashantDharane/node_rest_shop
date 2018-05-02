const mongoose = require('mongoose');
const ItemMaster = require('../models/itemMaster');

const ItemMasterService = {
    findById: (id) => {
        return ItemMaster
                .findById(id)
                .exec()    
    }
};

module.exports = ItemMasterService;