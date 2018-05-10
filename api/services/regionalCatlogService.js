const express = require('express');
const mongoose = require('mongoose');
const RegionalCatlog = require('../models/regionalCatlogs');
const regionalItemService = require('../services/regionalItemService');
const sellerItemService = require('../services/sellerItemService');
const itemMasterService = require('../services/itemMasterService');
const Router = express.Router();


class regionalCatalogService {
    findCatlogs(categories,subCategories,stateCode,orgId,countryCode){
        const filter = {
            organization_id : {
                $eq : orgId
            },
            category_id : {
                $in : categories
            },
            country_code : {
                $eq : countryCode
            },
            $or : [
                {
                    'regions.state_names' :{
                        $regex :  '.*'+stateCode+'.*'
                    }
                },
                {
                    'regions.state_codes' : {
                    $all : [stateCode] 
                    }
                }
            ]
        
        };
    
        if(subCategories) {
            filter.subCategories_id = {
                $in : subCategories
            }
        }
    
        return RegionalCatlog
            .find(filter)
            .exec();
    }

    featureItem(categories,subCategories,region,orgId,country,tags,limit){
        return this.findCatlogs(categories,subCategories,region,orgId,country)
        .then(catlogs => {
            
            const catlogIds = [];
            const regionalItemIds = [];
            const regionalItemMap = {};
            const itemMasterIds = [];
            const itemMasterMap = {};
            const sellerItemMap = {};

            catlogs.forEach(catlog => {
                catlogIds.push(catlog._id);
            });
            return regionalItemService.findRegionalItemsBySubCategory(catlogIds,subCategories,tags,limit)
                .then( regItems => {
                    
                    regItems.forEach(element => {
                        regionalItemMap[element._id] = element;
                        regionalItemIds.push(element._id);
                        itemMasterIds.push(element.item_master_id);
                    });

                    return itemMasterService
                        .findListByIds(itemMasterIds,orgId).then(masterItems => {
                            
                            masterItems.forEach(element => {
                                itemMasterMap[element._id] = element;
                            });
                            
                            return sellerItemService.findSellerItems(regionalItemIds,limit).then(sellerItem => {
                                
                                sellerItem.forEach(element => {
                                    sellerItemMap[element.regional_item_id] = element;                                                                                
                                });
                                const finalResult = [];
                                regItems.forEach(element => {
                                    let record = element.toObject();
                                    record['itemMasterData'] = itemMasterMap[element.item_master_id];
                                    record['sellerData'] = sellerItemMap[element._id];
                                                                       
                                    finalResult.push(record);
                                });
                                return finalResult;
                            })
                            .catch(err => {
                                throw new Error(err);
                            });
                        })
                        .catch(err => {
                            throw new Error(err);
                        });
                })
                .catch(err => {
                    throw new Error(err);
                });
        })
        .catch(err => {
            throw new Error(err);            
        });
    }
}

module.exports = regionalCatalogService;