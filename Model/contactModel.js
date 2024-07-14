const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    mobile: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const contactDB = mongoose.model('contact', contactSchema);
module.exports = contactDB;