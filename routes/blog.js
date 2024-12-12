const express = require('express');
const {validate} = require("../middleware/middleWare");
const authMiddleware = require('../middleware/authMiddleware');
const {body}= require('express-validator');
const router = express.Router();
const BlogController =require('../controller/blog')
router.post('/add-blog',  authMiddleware, validate([body('title').notEmpty().withMessage("this is rquires")]), BlogController.createBlog);
router.get('/show-blog', BlogController.getBlog)
//exports.router = router;
module.exports = router;