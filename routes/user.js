const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
router.post('/register', userController.createUser);
router.get('/viewuser', userController.getAllUsers)
router.get('/getuser/:id', userController.getUser);
router.delete('delete/:id', userController.deleteUser);
router.patch('/update/:id', userController.updateUser);
exports.router = router;