// Loads in mongoose
const mongoose = require('mongoose');
// Retrieves the schema from mongoose
const Schema = mongoose.Schema;

// Create Schema
const ContactSchema = new Schema 
({
    user:
    {
        type: String,
        required: true
    },

    firstName: 
    {
        type: String,
        required: true
    },

    lastName: 
    {
        type: String,
        required: true
    },

    address: 
    {
        type: String,
        required: false,
    },

    phoneNumber: 
    {
        type: String,
        required: false
    },
    email:
    {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }


});

module.exports = Contact = mongoose.model('contact2', ContactSchema);