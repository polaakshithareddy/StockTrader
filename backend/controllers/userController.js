const User = require('../models/User');

const toggleWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const stockId = req.params.stockId;
    const index = user.watchlist.indexOf(stockId);

    if (index > -1) {
      // Remove from watchlist
      user.watchlist.splice(index, 1);
    } else {
      // Add to watchlist
      user.watchlist.push(stockId);
    }

    await user.save();
    
    // Return populated watchlist
    const updatedUser = await User.findById(user._id).populate('watchlist');
    res.json(updatedUser.watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('watchlist');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { toggleWatchlist, getWatchlist };
