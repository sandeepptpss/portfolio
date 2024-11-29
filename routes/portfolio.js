const router = require('express').Router();
const portfolioController = require('../controller/portfolio');
router.post('/add/portfolio', portfolioController.portfolioCreate);
exports.router = router;  
