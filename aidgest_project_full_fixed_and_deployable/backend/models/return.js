const mongoose = require('mongoose');

const ReturnSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  amount: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Return', ReturnSchema);
