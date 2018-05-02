const express = require('express');
const ItemMaster = require('../models/itemMaster');
const itemMasterService = require('../services/itemMasterService');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message : 'handling GET request /products'
    });
});


router.get('/:productId',(req,res,next) => {
    const id = req.params.productId;

    itemMasterService
        .findById(id)
        .then( doc => {
            console.log(new mongoose.Types.ObjectId(id));
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;