// Loads in mongoose
const mongoose = require('mongoose');
// Retrieves the schema from mongoose
const Schema = mongoose.Schema;

// Create Schema
const UserScheme = new Schema 
({
    userName: 
    {
        type: String,
        required: true
    },

    password: 
    {
        type: String,
        required: true
    }

});

module.exports = User = mongoose.model('user', UserScheme);