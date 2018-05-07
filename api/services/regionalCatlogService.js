const express = require('express');
const mongoose = require('mongoose');
const RegionalCatlog = require('../models/regionalCatlogs');
const Router = express.Router();

const regionalCatalogService = {
    findCatlogs : (categories,subCategories,stateCode,orgId,countryCode) =>{
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
};

module.exports = regionalCatalogService;