const express = require('express');
const router = express.Router();
const { getPortfolio, getPortfolioSummary } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPortfolio);
router.route('/summary').get(protect, getPortfolioSummary);

module.exports = router;
