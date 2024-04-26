const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB server"))
  .catch(err => console.error("Could not connect to MongoDB server:", err));

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Mongoose default connection is open to ", mongoURL);
});

db.on('error', (err) => {
    console.log("Mongoose default connection has occurred " + err + " error");
});

db.on('disconnected', () => {
    console.log("Mongoose default connection is disconnected");
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0);
    });
});

module.exports = db;
