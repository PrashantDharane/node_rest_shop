const mongoose = require('mongoose');

const imagesSchema = mongoose.Schema({
    main_image_url : String,
    sub_images_url : [String]
});


module.exports = imagesSchema;