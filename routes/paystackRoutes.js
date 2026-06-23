const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const paystackController = require('../controllers/paystackController');

router.post('/initiate', authenticate, paystackController.initiatePayment);
router.post('/webhook', paystackController.paystackWebhook);

module.exports = router;
