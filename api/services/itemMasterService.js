const mongoose = require('mongoose');
const ItemMaster = require('../models/itemMaster');

const ItemMasterService = {
    findById: (id,organisationId) => {
        return ItemMaster
                .findOne({
                    _id : {
                        $eq : new mongoose.Types.ObjectId(id)
                    },
                    organization_id : organisationId
                })
                .exec()    
    },
    findAll: () => {
        return ItemMaster
                .find({})
                .exec()    
    },
    findListByIds: (ids,organisationId,limit) => {
        if(!Array.isArray(ids)){
            throw new Error("Argument 1: must be an Array.");
        }
        return ItemMaster
                .find({
                    _id : {
                        $in : ids
                    },
                    organization_id : {
                        $eq : organisationId
                    }
                })
                .limit(limit)
                .exec()    
    }
};


module.exports = ItemMasterService;