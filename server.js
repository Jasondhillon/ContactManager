// Express = backend
const express = require('express');
// Used to interact with MongoDB
const mongoose = require('mongoose');
const config = require('config');

// Creates an express application
const app = express();

// Bodyparser middleware
// Collects JSON from body and puts it in req.body
app.use(express.json());

// Gets MongoDB uri from the config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Sets up routes/api calls
const users = require('./routes/api/users');
const contacts = require('./routes/api/contacts');
const auth = require('./routes/api/auth');
app.use('/api/users', users);
app.use('/api/contacts', contacts);
app.use('/api/auth', auth);

const path = require('path');
// Serve static assess while in production
if (process.env.NODE_ENV === 'production')
{   
    // sets the static folder, putting the index.html in client/build
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Needed for Heroku implementation
const port = process.env.PORT || 5000;

// Checks if server is running
app.listen(port, () => console.log(`Server started on port ${port}`));