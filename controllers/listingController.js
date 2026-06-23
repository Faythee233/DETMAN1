const Listing = require('../models/Listing');

// Create a new listing
const createListing = async (req, res) => {
  try {
    const { title, description, price, sellerId } = req.body;

    const listing = await Listing.create({
      title,
      description,
      price,
      sellerId
    });

    res.json({ message: 'Listing created successfully', listing });
  } catch (err) {
    console.error('Listing create error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get all listings
const getListings = async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (err) {
    console.error('Listing fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get listing by ID
const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    res.json(listing);
  } catch (err) {
    console.error('Listing fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update listing
const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const { title, description, price } = req.body;
    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.price = price || listing.price;

    await listing.save();
    res.json({ message: 'Listing updated successfully', listing });
  } catch (err) {
    console.error('Listing update error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete listing
const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    await listing.destroy();
    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error('Listing delete error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing
};
