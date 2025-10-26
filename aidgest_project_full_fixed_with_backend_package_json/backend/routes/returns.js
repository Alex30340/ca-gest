const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const Return = require('../models/return');

router.post('/create-return', async (req, res) => {
  const { invoiceId, productId, amount } = req.body;

  try {
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) return res.status(404).send('Invoice not found');

    const newReturn = new Return({ productId, amount, description: `Retour produit ${productId}` });
    await newReturn.save();

    invoice.amount -= amount;
    await invoice.save();

    res.status(201).json(newReturn);
  } catch (err) {
    res.status(400).send('Error creating return');
  }
});

module.exports = router;
