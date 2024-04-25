const mongoose = require('mongoose')
require('dotenv').config();

const mongoURL = 'mongodb://localhost:27017/hotels'


mongoose.connect(mongoURL)
  .then(() => console.log("Connected to MongoDB server"))
  .catch(err => console.error("Could not connect to MongoDB server:", err));

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("Connected to MongoDB server");
})

db.on('Error', ()=>{
    console.log("MongoDB server Error");
})

db.on('disconnected', ()=>{
    console.log("Disconnected to MongoDB server");
})

module.exports = db;