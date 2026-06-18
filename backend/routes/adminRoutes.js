const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getTransactions, getAnalytics } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);
router.route('/transactions').get(protect, admin, getTransactions);
router.route('/analytics').get(protect, admin, getAnalytics);

module.exports = router;
