const express = require('express');
const router = express.Router();
const  authenticate  = require('../middleware/authMiddleware');
const  authorizeRole  = require('../middleware/roleMiddleware');
const {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionStatus
} = require('../controllers/transactionController');

// Get all transactions
router.get('/', authenticate, authorizeRole('admin'), getTransactions);

// Get transaction by ID
router.get('/:id', authenticate, getTransactionById);

// Create new transaction
router.post('/', authenticate, createTransaction);

// Update transaction status
router.put('/:id/status', authenticate, authorizeRole('admin'), updateTransactionStatus);

module.exports = router;
