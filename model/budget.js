const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  name: { type: String, default: 'mainBudget' },
  amount: Number,
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
