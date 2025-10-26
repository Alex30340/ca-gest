const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

const calculateVAT = (amount, vatRate) => {
  return (amount * vatRate) / 100;
};

router.post('/', async (req, res) => {
  const { clientName, amount, dueDate, status, clientEmail, vatRate } = req.body;
  const vatAmount = calculateVAT(amount, vatRate);
  const totalAmount = amount + vatAmount;

  try {
    const newInvoice = new Invoice({
      clientName,
      amount: totalAmount,
      dueDate,
      status,
      clientEmail,
      vatAmount
    });
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(400).send('Error creating invoice');
  }
});

module.exports = router;
