const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

router.get('/predict-cashflow', async (req, res) => {
  const invoices = await Invoice.find();
  const cashFlowPrediction = {
    expectedIncome: invoices.filter(invoice => invoice.status === 'unpaid').reduce((acc, invoice) => acc + invoice.amount, 0),
    expectedExpenditure: invoices.filter(invoice => invoice.status === 'paid').reduce((acc, invoice) => acc + invoice.amount, 0),
  };
  
  res.json(cashFlowPrediction);
});

module.exports = router;
