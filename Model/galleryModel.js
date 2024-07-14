const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const gallDB = mongoose.model('gallery', gallerySchema);
module.exports = gallDB;