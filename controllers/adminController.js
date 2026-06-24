// controllers/adminController.js
const ProvenanceDoc = require('../models/ProvenanceDoc');
const EscrowService = require('../services/EscrowService');
const cloudinary = require('../config/cloudinary'); // your Cloudinary setup

// Upload provenance doc to Cloudinary
const uploadProvenanceDoc = async (req, res, next) => {
  try {
    const { transactionId, docType } = req.body;
    const file = req.file; // assuming multer handles file upload

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'provenance_docs',
    });

    // Save record in DB
    const doc = await ProvenanceDoc.create({
      transactionId,
      docType,
      cloudinaryUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
    });

    res.json({ success: true, doc });
  } catch (err) {
    next(err);
  }
};

// Admin verifies provenance doc
const verifyProvenanceDoc = async (req, res, next) => {
  try {
    const { docId } = req.body;

    const doc = await ProvenanceDoc.findByPk(docId);
    if (!doc) {
      return res.status(404).json({ error: 'Provenance document not found' });
    }

    doc.verified = true;
    await doc.save();

    res.json({ success: true, message: 'Provenance document verified', doc });
  } catch (err) {
    next(err);
  }
};

// Admin triggers escrow release
const releaseEscrow = async (req, res, next) => {
  try {
    const { transactionId } = req.body;
    const tx = await EscrowService.releaseFunds(transactionId);
    res.json(tx);
  } catch (err) {
    next(err);
  }
};


module.exports = {
  verifyProvenanceDoc,
  releaseEscrow,
};
