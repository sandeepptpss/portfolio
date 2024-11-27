const authController = require('../controller/auth')
const express = require('express');
const router = express.Router();
router.post('/auth/login', authController.userLogin);
router.post('/forgotPassword', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)
exports.router = router;  