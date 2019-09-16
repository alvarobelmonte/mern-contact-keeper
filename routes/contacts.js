const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
    try {
       const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }); //most recent contacts first
       res.json(contacts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

// @route   POST api/contacts
// @desc    Add new contacts
// @access  Private
router.post('/', [authMiddleware, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    
    try {
        const newContact = new Contact ({
            name, 
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, email, phone, type } = req.body;

    const contacFields = {};
    if (name) contacFields.name = name;
    if (email) contacFields.email = email;
    if (phone) contacFields.phone = phone;
    if (type) contacFields.type = type;

    try {
        let contactFound = await Contact.findById(req.params.id);
        if(!contactFound) return res.status(404).json({ msg: 'Contact not found' });

        //Make sure user owns the contact
        if (contactFound.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        contactFound = await Contact.findByIdAndUpdate(req.params.id, {
            $set: contacFields
        }, { new: true });

        res.json(contactFound);
    } catch (error) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// @route   DELETE api/contacts:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        let contactFound = await Contact.findById(req.params.id);
        if(!contactFound) return res.status(404).json({ msg: 'Contact not found' });
        
        //Make sure user owns the contact
        if (contactFound.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact removed' });
    } catch (error) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;