const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/devconnect');

        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;