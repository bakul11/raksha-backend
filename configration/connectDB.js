const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connect Successfully Done");
    } catch (error) {
        console.log("Database Connnect Fail...");
    }
}

module.exports = connectDB;