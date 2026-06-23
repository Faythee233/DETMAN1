const Transaction = require('../models/Transaction');
const EscrowService = require('../services/escrowService');
const paystack = require('../config/paystack'); // your Paystack SDK or axios wrapper
const logger = require('../utils/logger');

// Initiate payment
async function initiatePayment(req, res) {
  try {
    const { transactionId } = req.body;
    const tx = await Transaction.findByPk(transactionId);
    if (!tx) return res.status(404).json({ error: 'Transaction not found' });

    // Call Paystack to initialize payment
    const response = await paystack.transaction.initialize({
      email: req.user.email,
      amount: tx.amount * 100, // Paystack expects kobo
      reference: `TX-${transactionId}-${Date.now()}`
    });

    // Save reference in transaction
    tx.paymentReference = response.data.reference;
    await tx.save();

    logger.info(`Payment initiated for transaction ${transactionId}, reference ${tx.paymentReference}`);
    res.json({ authorizationUrl: response.data.authorization_url });
  } catch (err) {
    logger.error(`Payment initiation failed: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
}

// Verify payment manually (optional)
async function verifyPayment(req, res) {
  try {
    const { reference } = req.params;
    const response = await paystack.transaction.verify(reference);

    if (response.data.status === 'success') {
      const tx = await Transaction.findOne({ where: { paymentReference: reference } });
      if (tx) {
        await EscrowService.holdFunds(tx.id, reference);
        res.json({ success: true, message: 'Payment verified and funds held in escrow', transaction: tx });
      } else {
        res.status(404).json({ error: 'Transaction not found' });
      }
    } else {
      res.json({ success: false, message: 'Payment verification failed' });
    }
  } catch (err) {
    logger.error(`Payment verification failed: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
}

// Handle Paystack webhook
async function handleWebhook(req, res) {
  try {
    const event = req.body.event;
    if (event === 'charge.success') {
      const reference = req.body.data.reference;
      const tx = await Transaction.findOne({ where: { paymentReference: reference } });
      if (tx) {
        await EscrowService.holdFunds(tx.id, reference);
        logger.info(`Webhook: funds held in escrow for transaction ${tx.id}`);
      }
    }
    res.sendStatus(200);
  } catch (err) {
    logger.error(`Webhook handling failed: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  initiatePayment,
  verifyPayment,
  handleWebhook
};


