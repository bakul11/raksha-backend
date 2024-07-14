const mongoose = require('mongoose');

const reviewModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    disc: {
        type: String,
        required: true,
        unique: true

    },
    rating: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        default: ''
    }
})

const reviewDB = mongoose.model('review', reviewModel);
module.exports = reviewDB;