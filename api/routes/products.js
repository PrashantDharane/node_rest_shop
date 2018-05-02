const express = require('express');
const Product = require('../models/product');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message : 'handling GET request /products'
    });
});

router.post('/',(req,res,next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price 
    });
    product
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err)
        });
    res.status(200).json({
        message : 'handling POST request /products',
        product : product
    });
});

router.get('/:productId',(req,res,next) => {
    const id = req.params.productId;
    Product
        .findById(id)
        .exec()
        .then( doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;