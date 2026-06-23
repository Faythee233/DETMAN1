const express = require('express');
const router = express.Router();
const authenticate  = require('../middleware/authMiddleware');
const upload = require('../middleware/upload.js');
const { uploadProvenanceDoc, getProvenanceDocs } = require('../controllers/provenanceController');

router.post('/upload', authenticate, upload.single('file'), uploadProvenanceDoc);
router.get('/:transactionId', authenticate, getProvenanceDocs);

module.exports = router;
