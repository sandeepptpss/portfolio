const express = require('express');
const router = express.Router();
const contactController = require('../controller/contact');
router.post('/add', contactController.createContact);
router.delete('/delete/:id', contactController.deleteContact)
exports.router = router;  
