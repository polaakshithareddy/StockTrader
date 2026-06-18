const User = require('../models/User');
const Transaction = require('../models/Transaction');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate('userId', 'name email')
      .populate('stockId', 'symbol companyName')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalTrades = await Transaction.countDocuments({});
    
    res.json({
        totalUsers,
        totalTrades
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getUsers, deleteUser, getTransactions, getAnalytics };
