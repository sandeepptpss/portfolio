const path = require('path');
const model = require('../model/contact');
const Contact = model.Contact;
exports.createContact = async (req, res) => {
  const { name, email, messages } = req.body;
  if (!email) {
    return res.status(400).send({ code: 400, message: 'Email is required.' });
  }
   const newContact = new Contact({
    name,
    email,
    messages
  });
const success = await newContact.save();
    if(success) {
      res.status("200").json({message:"sucessfully added",success});
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
exports.deleteContact = async(req , res)=>{
 const id = req.params.id;
 const deleteContact = await Contact.deleteOne({_id:id});
if (deleteContact) {
  return res.send({ code: 200, message: 'Deleted Data Successfully' });
} else {
  return res.send({ code: 404, message: 'Service error' });
}
}