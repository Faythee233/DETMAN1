const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');
const {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing
} = require('../controllers/listingController');

// Create a new listing (only logged-in users)
router.post('/', authenticate, createListing);

// Get all listings (public)
router.get('/', getListings);

// Get single listing (public)
router.get('/:id', getListingById);

// Update listing (only owner or admin)
router.put('/:id', authenticate, updateListing);

// Delete listing (only owner or admin)
router.delete('/:id', authenticate, deleteListing);

module.exports = router;
