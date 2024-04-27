const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number, // Corrected typo: "type" instead of "tyep"
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});

const Person = mongoose.model('person', personSchema);
module.exports = Person;
