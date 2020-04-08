// Loads the express module so we can use it
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// Contact Model
// Need to load this in to make queries
const Contact = require('../../models/Contact');

// @router GET to api/contacts
// @desc   GETs all contacts
router.post('/getContacts', auth, (req, res) => 
{   
    var query = {};
    query['user'] = req.body._id;
    Contact.find(query)
        .sort({ firstName: 1})
        .then(contacts => res.json(contacts))
        .catch(err => res.status(404).json({ msg: 'Cannot access contacts for current user' }));
});

// @router POST to api/contacts
// @desc   Create a contact
// @access Private
router.post('/', auth, (req, res) => 
{

    const newContact = new Contact
    ({
        user : req.body.user,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    });


    // Save to the DB
    newContact.save()
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json({ msg: 'Missing contact fields' }));
});

// @router POST to api/contacts/edit
// @desc   Edit a contact
// @access Private
router.post('/edit', auth, (req, res) => 
{

    const {_id , firstName, lastName, address, phoneNumber, email} = req.body;

    Contact.findOneAndUpdate({_id: _id}, 
        {
        firstName, 
        lastName,
        address,
        phoneNumber,
        email
        },
        {new : true,
        useFindAndModify: false}
    ).then()
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json({ msg: 'Missing some contact fields' }));
});

// @router DELETE to api/contacts
// @desc   Delete a contact
// @access Private
router.delete('/:id', auth, (req, res) => 
{
    // Finds the item in the DB based on the id given in delete request
    Contact.findById(req.params.id)
        // If person is found and deleted 
        .then(contact => contact.remove()).then(() => res.json({success: true}))
        // If person is not in DB, return 404
        .catch(err => res.status(404).json({ msg: 'Contact is missing, cannot delete' }));
});

module.exports = router;