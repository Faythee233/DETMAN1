const crypto = require('crypto');
const cloudinary = require('../config/cloudinary'); // your Cloudinary config
const ProvenanceDoc = require('../models/ProvenanceDoc');

// Upload provenance document
const uploadProvenanceDoc = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    // Generate hash for authenticity
    const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');

    // Upload directly using buffer (no streamifier needed)
    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      { resource_type: 'auto' }
    );

    // Save metadata in DB
    const doc = await ProvenanceDoc.create({
      transactionId: req.body.transactionId,
      fileUrl: result.secure_url,
      fileHash,
      verifiedBy: req.body.verifiedBy || null,
    });

    res.json(doc);
  } catch (err) {
    console.error('Provenance upload error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get provenance docs for a transaction
const getProvenanceDocs = async (req, res) => {
  try {
    const docs = await ProvenanceDoc.findAll({
      where: { transactionId: req.params.transactionId }
    });

    res.json(docs);
  } catch (err) {
    console.error('Provenance fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadProvenanceDoc,
  getProvenanceDocs
};
