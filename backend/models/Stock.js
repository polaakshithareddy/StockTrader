const mongoose = require('mongoose');

const stockSchema = mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    openPrice: {
      type: Number,
    },
    closePrice: {
      type: Number,
    },
    marketCap: {
      type: Number,
    },
    volume: {
      type: Number,
    },
    historicalData: [
      {
        date: Date,
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
