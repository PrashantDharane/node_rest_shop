const mongoose  = require('mongoose');
const RegionalItem = require('../models/regionalItem');

const regionalItemService =  {
    findById : (id) => {
        return RegionalItem
            .findById(id)
            .exec();
    }
};

module.exports = regionalItemService;