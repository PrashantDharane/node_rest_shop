const express = require('express');
const mongoose = require('mongoose');
const regionalItemService = require('../services/regionalItemService');

const router = express.Router();


router.post("/pricerange",(req,res,next) => {
    const requestData = req.body;
    const subCategories = {};
    
    if(requestData.subCategories && Array.isArray(requestData.subCategories)){
        subCategories.value = requestData.subCategories;
    }

    var objectIds = [];
    requestData.ids.forEach(element => {
        objectIds.push(new mongoose.Types.ObjectId(element))
    });
    regionalItemService
        .findMaxMinPrice(objectIds,subCategories.value)
        .then((doc) => {
            res.status(200)
               .json(doc);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post("/itemsbycategory",(req,res,next) => {
    const requestData = req.body;
    regionalItemService.findRegionalItemsBySubCategory(requestData.ids,requestData.subCategories,requestData.tags,requestData.limit)
        .then((doc)=> {
            res.status(200).json(doc);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
});
module.exports = router;