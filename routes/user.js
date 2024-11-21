const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
router.post('/register', userController.createUser);
router.get('/viewuser', userController.getAllUsers)
exports.router = router;