const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Stock',
    },
    type: {
      type: String,
      required: true,
      enum: ['BUY', 'SELL'],
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
