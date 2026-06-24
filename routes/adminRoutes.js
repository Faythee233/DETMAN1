const express = require('express');
const router = express.Router();
const  authenticate  = require('../middleware/authMiddleware');
const  authorizeRole  = require('../middleware/roleMiddleware');
const { verifyProvenanceDoc, releaseEscrow, refundEscrow } = require('../controllers/adminController');

// Verify provenance document
router.post('/provenance/verify', authenticate, authorizeRole('admin'), verifyProvenanceDoc);

// Release escrow funds 
router.post('/transactions/:id/release', authenticate, authorizeRole('admin'), releaseEscrow);


module.exports = router;
