const Transaction = require('../models/Payments');

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const txns = await Transaction.findAll();
    res.json(txns);
  } catch (err) {
    console.error('Transaction fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const txn = await Transaction.findByPk(req.params.id);
    if (!txn) return res.status(404).json({ error: 'Transaction not found' });
    res.json(txn);
  } catch (err) {
    console.error('Transaction fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Create a new transaction (internal, not Paystack)
const createTransaction = async (req, res) => {
  try {
    const { buyerId, sellerId, listingId, amount } = req.body;
    const txn = await Transaction.create({
      buyerId,
      sellerId,
      listingId,
      amount,
      status: 'pending'
    });
    res.json(txn);
  } catch (err) {
    console.error('Transaction create error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update transaction status (e.g., escrow, completed, refunded)
const updateTransactionStatus = async (req, res) => {
  try {
    const txn = await Transaction.findByPk(req.params.id);
    if (!txn) return res.status(404).json({ error: 'Transaction not found' });

    txn.status = req.body.status;
    await txn.save();

    res.json({ message: 'Transaction status updated', txn });
  } catch (err) {
    console.error('Transaction update error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionStatus
};

module.exports = {Transaction, getTransactions, getTransactionById, createTransaction, updateTransactionStatus};