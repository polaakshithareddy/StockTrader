const express = require('express');
const router = express.Router();
const { toggleWatchlist, getWatchlist } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/watchlist', protect, getWatchlist);
router.post('/watchlist/:stockId', protect, toggleWatchlist);

module.exports = router;
