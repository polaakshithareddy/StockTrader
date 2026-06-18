const Portfolio = require('../models/Portfolio');
const User = require('../models/User');

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id }).populate('holdings.stockId');
    
    if (!portfolio) {
      res.status(404);
      throw new Error('Portfolio not found');
    }

    // Calculate current value and total profit loss based on live mock prices
    let currentValue = 0;
    
    portfolio.holdings.forEach(holding => {
      if (holding.stockId) {
        currentValue += holding.quantity * holding.stockId.currentPrice;
      }
    });

    portfolio.currentValue = currentValue;
    portfolio.totalProfitLoss = currentValue - portfolio.totalInvestment;
    
    await portfolio.save();

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPortfolioSummary = async (req, res) => {
  try {
     const portfolio = await Portfolio.findOne({ userId: req.user._id }).populate('holdings.stockId');
     const user = await User.findById(req.user._id);

     if (!portfolio) {
        return res.json({ walletBalance: user.walletBalance, totalInvestment: 0, currentValue: 0, totalProfitLoss: 0, holdingsCount: 0 });
     }
     
     res.json({
         walletBalance: user.walletBalance,
         totalInvestment: portfolio.totalInvestment,
         currentValue: portfolio.currentValue,
         totalProfitLoss: portfolio.totalProfitLoss,
         holdingsCount: portfolio.holdings.length
     });
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
}

module.exports = { getPortfolio, getPortfolioSummary };
