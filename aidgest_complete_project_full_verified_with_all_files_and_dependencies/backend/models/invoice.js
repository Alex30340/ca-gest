const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  clientEmail: { type: String, required: true },
  vatAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
