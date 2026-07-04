const express = require('express');
const router = express.Router();
const { toggleWatchlist, getWatchlist, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getUserProfile);
router.get('/watchlist', protect, getWatchlist);
router.post('/watchlist/:stockId', protect, toggleWatchlist);

module.exports = router;
