const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./api/config/config');
const itemMasterRoutes = require('./api/routes/itemMasterController');
const regionalItemRoutes = require('./api/routes/regionalItemController');

const app = express();

//MongoDb connection
mongoose.connect(config.getDbUrl());

//Application Logger
app.use(morgan('dev'));

//Application request parsing
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//CORS handling
app.use((req,res,next)=> {
    res.header('Access-Control-Allow-Origin','*');
    if(req.method === 'OPTIONS') {
        res.header('POST,GET,PATCH,PUT,DELETE');
        return res.status(200).json({});    
    }
    next();
});

app.use('/products',itemMasterRoutes);
app.use('/regionalItem',regionalItemRoutes);
app.use((req,res,next) => {
    const error = new Error("Not Found!");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500); //Status 500 for any other kinds of status codes
    res.json({
        error : {
            message : error.message
        }
    });
});


module.exports = app;
