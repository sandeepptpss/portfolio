const router = require('express').Router();
const portfolioController = require('../controller/portfolio');
router.post('/add/portfolio', portfolioController.portfolioCreate);
router.get('/portfolioview', portfolioController.portfolioViews);
router.get('/getportfolio/:id', portfolioController.getPortfolio);
exports.router = router;  
