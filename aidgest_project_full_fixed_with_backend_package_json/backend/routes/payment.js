const express = require('express');
const Stripe = require('stripe');
const router = express.Router();
const stripe = Stripe('your_stripe_secret_key');

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description: 'Paiement abonnement',
      metadata: { integration_check: 'accept_a_payment' }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).send('Erreur lors de la création du paiement');
  }
});

module.exports = router;
