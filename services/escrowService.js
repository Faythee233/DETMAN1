// services/EscrowService.js
const Transaction = require('../models/Payments');
const ProvenanceDoc = require('../models/ProvenanceDoc');
const paystack = require('../services/paymentservice');

class EscrowService {
  static async holdFunds(transactionId, paymentReference) {
    const tx = await Transaction.findByPk(transactionId);
    if (!tx) throw new Error('Transaction not found');

    tx.status = 'in_escrow';
    tx.paymentReference = paymentReference;
    await tx.save();

    console.log(`Funds held in escrow for transaction ${transactionId}`);
    return tx;
  }

  static async releaseFunds(transactionId) {
    const tx = await Transaction.findByPk(transactionId);
    if (!tx) throw new Error('Transaction not found');

    // Step 1: Check for verified provenance docs
    const docs = await ProvenanceDoc.findAll({ where: { transactionId, verified: true } });
    if (!docs.length) throw new Error('No verified provenance docs found');

    console.log(`Provenance verified for transaction ${transactionId}`);

    // Step 2: Call Paystack Transfer API
    await paystack.transferFunds(tx);

    tx.status = 'released';
    await tx.save();

    console.log(`Funds released for transaction ${transactionId}`);
    return tx;
  }

  static async refundTransaction(transactionId) {
    const tx = await Transaction.findByPk(transactionId);
    if (!tx) throw new Error('Transaction not found');

    // Step 1: Check for verified provenance docs
    const docs = await ProvenanceDoc.findAll({ where: { transactionId, verified: true } });
    if (!docs.length) throw new Error('No verified provenance docs found');

    console.log(`Provenance verified for transaction ${transactionId}`);

    // Step 2: Call Paystack Refund API
    await paystack.refundPayment(tx);

    tx.status = 'refunded';
    await tx.save();

    console.log(`Funds refunded for transaction ${transactionId}`);
    return tx;
  }
}

module.exports = EscrowService;
