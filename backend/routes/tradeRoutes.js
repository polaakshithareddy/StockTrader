const express = require('express');
const router = express.Router();
const { buyStock, sellStock, getTransactionHistory } = require('../controllers/tradeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/buy').post(protect, buyStock);
router.route('/sell').post(protect, sellStock);
router.route('/history').get(protect, getTransactionHistory);

module.exports = router;
