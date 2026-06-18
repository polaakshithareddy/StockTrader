const Transaction = require('../models/Transaction');
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const Stock = require('../models/Stock');

const buyStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;
    const userId = req.user._id;

    const stock = await Stock.findById(stockId);
    if (!stock) {
      res.status(404);
      throw new Error('Stock not found');
    }

    const price = stock.currentPrice;
    const totalAmount = price * quantity;

    const user = await User.findById(userId);
    if (user.walletBalance < totalAmount) {
      res.status(400);
      throw new Error('Insufficient wallet balance');
    }

    // Deduct balance
    user.walletBalance -= totalAmount;
    await user.save();

    // Record Transaction
    const transaction = await Transaction.create({
      userId,
      stockId,
      type: 'BUY',
      quantity,
      price,
      totalAmount,
    });

    // Update Portfolio
    let portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      portfolio = await Portfolio.create({ userId });
    }

    const holdingIndex = portfolio.holdings.findIndex(h => h.stockId.toString() === stockId);

    if (holdingIndex >= 0) {
      const holding = portfolio.holdings[holdingIndex];
      const newQuantity = holding.quantity + quantity;
      const newAveragePrice = ((holding.averagePrice * holding.quantity) + totalAmount) / newQuantity;
      
      portfolio.holdings[holdingIndex].quantity = newQuantity;
      portfolio.holdings[holdingIndex].averagePrice = newAveragePrice;
    } else {
      portfolio.holdings.push({
        stockId,
        quantity,
        averagePrice: price,
      });
    }

    portfolio.totalInvestment += totalAmount;
    await portfolio.save();

    res.status(201).json(transaction);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const sellStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;
    const userId = req.user._id;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      res.status(404);
      throw new Error('Portfolio not found');
    }

    const holdingIndex = portfolio.holdings.findIndex(h => h.stockId.toString() === stockId);
    if (holdingIndex < 0 || portfolio.holdings[holdingIndex].quantity < quantity) {
      res.status(400);
      throw new Error('Insufficient stock quantity in portfolio');
    }

    const stock = await Stock.findById(stockId);
    const price = stock.currentPrice;
    const totalAmount = price * quantity;

    // Add balance
    const user = await User.findById(userId);
    user.walletBalance += totalAmount;
    await user.save();

    // Record Transaction
    const transaction = await Transaction.create({
      userId,
      stockId,
      type: 'SELL',
      quantity,
      price,
      totalAmount,
    });

    // Update Portfolio
    const holding = portfolio.holdings[holdingIndex];
    const costBasisOfSold = holding.averagePrice * quantity;
    
    holding.quantity -= quantity;
    portfolio.totalInvestment -= costBasisOfSold;

    // Realized P/L calculation could be added here.
    
    if (holding.quantity === 0) {
      portfolio.holdings.splice(holdingIndex, 1);
    }

    await portfolio.save();

    res.status(201).json(transaction);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .populate('stockId', 'symbol companyName')
      .sort({ createdAt: -1 });
      
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { buyStock, sellStock, getTransactionHistory };
