const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    disc: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const noticeDB = mongoose.model('allnotice', noticeSchema);
module.exports = noticeDB;