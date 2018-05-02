const express = require('express');
const regionalItemService = require('../services/regionalItemService');

const router = express.Router();


router.get("/:id",(req,res,next) => {
    regionalItemService
        .findById(req.params.id)
        .then((doc) => {
            res.status(200)
               .json(doc);
        })
});

module.exports = router;