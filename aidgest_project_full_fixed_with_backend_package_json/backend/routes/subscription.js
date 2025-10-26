const express = require('express');
const router = express.Router();
const Subscription = require('../models/subscription');

router.post('/create', async (req, res) => {
  const { clientId, service, amount, frequency } = req.body;
  try {
    const newSubscription = new Subscription({
      clientId,
      service,
      amount,
      frequency,
      nextInvoiceDate: new Date()
    });
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (err) {
    res.status(400).send('Error creating subscription');
  }
});

module.exports = router;
