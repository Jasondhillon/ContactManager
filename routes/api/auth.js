const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const auth =  require('../../middleware/auth');

// User Model
// Need to load this in to make queries
const User = require('../../models/User');

// @router Get to api/auth
// @desc   Get contacts db 
// @access Private
router.get('/', auth, (req, res) => {
    // Validates the user without the password
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

// @router POST to api/auth
// @desc   Log in to the db
// @access Public
router.post('/', (req, res) => 
{
    const {userName, password} = req.body;

    if (!userName || !password)
        return res.status(400).json({ msg: 'Please enter username and password'});

    User.findOne({userName})
    .then(user => {
        if (!user) return res.status(400).json({ msg: 'Username not found'});

        if (password != user.password)
            return res.status(400).json({ msg: 'Invalid username/password'});
        else
        {
            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;

                    res.json({
                        user,
                        token,
                        success: true
                    });
                }
            );
        }
    });
});

module.exports = router;