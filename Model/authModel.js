const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    occupation: {
        type: String,
        required: false,
    },
    phone: {
        type: Number,
        required: false,
    },
    zipcode: {
        type: Number,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,

    },
    profile: {
        type: String,
        default: 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
})

const authDB = mongoose.model('auth', userSchema);
module.exports = authDB;