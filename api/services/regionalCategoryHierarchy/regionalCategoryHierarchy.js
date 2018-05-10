const regionalCategoryhierarchy = require('../../models/regionalCategoryhierarchy');
const mongoose = require('mongoose');

class regionalCategoryhierarchyService {
    find(){
        return regionalCategoryhierarchy.find({
            _id : '598041eb7373755ec9e95795'
        })
        .exec();
    }

    
}

module.exports = regionalCategoryhierarchyService;