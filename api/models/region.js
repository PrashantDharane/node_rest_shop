const mongoose = require('mongoose');

const region = mongoose.Schema({
    state_code : [String],
    state_name : String
});

module.exports = region;