const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true,
    },
    holdings: [
      {
        stockId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Stock',
        },
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
        averagePrice: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    totalInvestment: {
      type: Number,
      default: 0,
    },
    currentValue: {
      type: Number,
      default: 0,
    },
    totalProfitLoss: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;
