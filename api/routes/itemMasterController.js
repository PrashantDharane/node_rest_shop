const express = require('express');
const ItemMaster = require('../models/itemMaster');
const regionalItemService = require('../services/regionalItemService');
const regionalCatalogService = require('../services/regionalCatlogService');
const sellerItemService = require('../services/sellerItemService');
const itemMasterService = require('../services/itemMasterService');
const mongoose = require('mongoose');
const router = express.Router();


router.post('/feature-items',(req,res,next) => {
    const requestData = req.body;
    // {"categories":["200000000000000000"],"sub-categories":["203000000000000000"],"country":"IN","region":"MH","orgId":"ITZZBRAND"}
    const categories = requestData.categories;
    const subCategories = requestData['sub-categories'];
    const region = requestData.region;
    const country = requestData.country;
    const orgId = requestData.orgId;
    const tags = requestData.tags;
    const limit = requestData.limit;

    regionalCatalogService
        .findCatlogs(categories,subCategories,region,orgId,country)
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
            regionalItemService.findRegionalItemsBySubCategory(catlogIds,subCategories,tags,limit)
                .then( regItems => {
                    regItems.forEach(element => {
                        regionalItemMap[element._id] = element;
                        regionalItemIds.push(element._id);
                        itemMasterIds.push(element.item_master_id);
                    });

                    itemMasterService
                        .findListByIds(itemMasterIds,orgId).then(masterItems => {
                            masterItems.forEach(element => {
                                itemMasterMap[element._id] = element;
                            });
                            
                            sellerItemService.findSellerItems(regionalItemIds,limit).then(sellerItem => {
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
                                res.status(200).json(finalResult);
                            })
                            .catch(err => {
                                res.status(500).json(err);
                            });
                        })
                        .catch(err => {
                            res.status(500).json(err);
                        });
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/product',(req,res,next) => {
    const requestData = req.body;
    itemMasterService
        .findById(requestData.id,requestData.orgId)
        .then( doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/',(req,res,next) => {
    const requestData = req.body;
    itemMasterService
        .findListByIds(requestData.ids,requestData.orgId,requestData.limit)
        .then( doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;