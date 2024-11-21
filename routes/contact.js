const express = require('express');
const router = express.Router();
const contactController = require('../controller/contact');
router.post('/add', contactController.createContact);
exports.router = router;  
