const path = require('path');
const model = require('../model/contact');
const Contact = model.Contact;
exports.createContact = async (req, res) => {
   const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    messages: req.body.messages,
    });
    const success = await newContact.save();
    if (success) {
      return res.send({ code: 200, message: 'add success' });
    } else {
      return res.send({ code: 404, message: 'Service error' });
    }
};
exports.getAllContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).send({ code: 500, message: 'Internal Server Error' });
  }
};
