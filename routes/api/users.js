// Loads the express module so we can use it
const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
// Need to load this in to make queries
const User = require('../../models/User');

// @router POST to api/users
// @desc   Create a new user
router.post('/', (req, res) => 
{
    const {userName, password} = req.body;

    // Check if both a username and password was sent
    if (!userName || !password)
        return res.status(400).json({ msg: 'Please enter username and password'}); 

    User.findOne({userName})
        .then(user => {
            if (user) return res.status(400).json({ msg: 'Username already exists'});
        });

    const newUser = new User
    ({
        userName,
        password
    });

    // Save to the DB
    newUser.save().then(user => {
        
        jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;

                res.json({
                    token,
                    user,
                    success: true
                });
            }
        )});
});

// @router DELETE to api/Items
// @desc   Delete a Item
router.delete('/:id', (req, res) => 
{
    // Finds the item in the DB based on the id given in delete request
    User.findById(req.params.id)
        // If user is found and deleted 
        .then(user => user.remove()).then(() => res.json({success: true}))
        // If user is not in DB, return 404
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;