const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

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