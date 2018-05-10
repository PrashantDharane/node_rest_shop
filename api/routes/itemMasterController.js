const express = require('express');
const ItemMaster = require('../models/itemMaster');
const regionalItemService = require('../services/regionalItemService');
const regionalCatalogService = require('../services/regionalCatlogService');
const sellerItemService = require('../services/sellerItemService');
const itemMasterService = require('../services/itemMasterService');
const hierarchyService = require('../services/regionalCategoryHierarchy/regionalCategoryHierarchy');
const RegionalCategoryHierarchyPreProcessor = require('../services/regionalCategoryHierarchy/regionalCategoryHierarchyProcessor');
const mongoose = require('mongoose');
const router = express.Router();


router.post('/feature-items',(req,res,next) => {
    const requestData = req.body;
    const categories = requestData.categories;
    const subCategories = requestData['sub-categories'];
    const region = requestData.region;
    const country = requestData.country;
    const orgId = requestData.orgId;
    const tags = requestData.tags;
    const limit = requestData.limit;

    new regionalCatalogService()
        .featureItem(categories,subCategories,region,orgId,country,tags)
        .then(result => {
            res.status(200).json(result);
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

router.get('/hierarchy',(req,res,next) => {
    new hierarchyService().find()
        .then(doc => {
            const processor = new RegionalCategoryHierarchyPreProcessor(doc[0].toObject());
            
            res.status(200).json(processor.getHierarchyWithMetadata());
        });
});
module.exports = router;