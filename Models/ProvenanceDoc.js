
// models/ProvenanceDoc.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // adjust path to your Sequelize instance

const ProvenanceDoc = sequelize.define('ProvenanceDoc', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Payments', // name of your Transaction/Payments table
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  docType: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Type of provenance doc (e.g., certificate, receipt, license)',
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Cryptographic hash of the document for integrity verification',
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether this doc has been reviewed and verified by admin',
  },
}, {
  tableName: 'ProvenanceDocs',
  timestamps: true,
});

module.exports = ProvenanceDoc;

