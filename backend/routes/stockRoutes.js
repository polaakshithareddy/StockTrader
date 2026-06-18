const express = require('express');
const router = express.Router();
const { getStocks, getStockById, seedStocks, getStockChart } = require('../controllers/stockController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getStocks);
router.post('/seed', protect, admin, seedStocks);
router.get('/:id', getStockById);
router.get('/:id/chart', getStockChart);

module.exports = router;
