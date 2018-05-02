const express = require('express');
const router = express.Router();

router.get("/",(req,res,next) => {
    res.status(200).json({
        "message" : "orders / get method"
    });
});

router.post("/",(req,res,next) => {
    res.status(200).json({
        "message" : "orders / post method"
    });
});

router.get("/:orderId",(req,res,next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        "message" : "orders / get method",
        "id" : orderId
    });
});

module.exports = router;