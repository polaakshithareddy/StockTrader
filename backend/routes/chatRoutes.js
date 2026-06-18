const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

// Chat endpoint (protected, so only logged in users can use the AI)
router.post('/', protect, handleChat);

module.exports = router;
