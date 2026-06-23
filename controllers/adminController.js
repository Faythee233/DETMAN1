const Transaction = require('../models/Payments');
const ProvenanceDoc = require('../models/ProvenanceDoc');

// Verify provenance doc
const verifyProvenanceDoc = async (req, res) => {
  try {
    const { docId, verifiedBy } = req.body;
    const doc = await ProvenanceDoc.findByPk(docId);
    if (!doc) return res.status(404).json({ error: 'Doc not found' });

    doc.verifiedBy = verifiedBy;
    await doc.save();

    res.json({ message: 'Provenance document verified', doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Release escrow funds to seller
const releaseEscrow = async (req, res) => {
  try {
    const txn = await Transaction.findByPk(req.params.id);
    if (!txn) return res.status(404).json({ error: 'Transaction not found' });

    txn.status = 'completed';
    await txn.save();

    res.json({ message: 'Escrow released, transaction completed', txn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Refund escrow back to buyer
const refundEscrow = async (req, res) => {
  try {
    const txn = await Transaction.findByPk(req.params.id);
    if (!txn) return res.status(404).json({ error: 'Transaction not found' });

    txn.status = 'refunded';
    await txn.save();

    // Here you would also call Paystack’s refund API if needed
    // Example: axios.post('https://api.paystack.co/refund', { reference: txn.reference })

    res.json({ message: 'Escrow refunded to buyer', txn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  verifyProvenanceDoc,
  releaseEscrow,
  refundEscrow
};
