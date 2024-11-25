const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
router.post('/register', userController.createUser);
router.get('/viewuser', userController.getAllUsers)
router.get('/user/:id', userController.getUser);
router.patch('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser)
exports.router = router;