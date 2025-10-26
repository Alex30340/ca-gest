require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const invoiceRoutes = require('./routes/invoices');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const subscriptionRoutes = require('./routes/subscription');
const exportRoutes = require('./routes/export');
const purchaseRoutes = require('./routes/purchase');
const ocrRoutes = require('./routes/ocr');
const errorHandler = require('./middleware/errorHandler');
const nodemailer = require('nodemailer');
const cashflowRoutes = require('./routes/cashflow');
const currencyRoutes = require('./routes/currency');
const subscriptionInvoiceRoutes = require('./routes/subscriptionInvoices');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/invoices', invoiceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/cashflow', cashflowRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/subscriptionInvoices', subscriptionInvoiceRoutes);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmailReminder = (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reminder: Invoice Due',
    text: 'This is a reminder that your invoice is due soon.'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log('Server is running on port ' + PORT);
});
