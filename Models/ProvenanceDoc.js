const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Transaction = require('./Transaction');
const User = require('./User');

const ProvenanceDoc = sequelize.define('ProvenanceDoc', {
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Associations
ProvenanceDoc.belongsTo(Transaction, { foreignKey: 'transactionId', as: 'transaction' });
Transaction.hasMany(ProvenanceDoc, { foreignKey: 'transactionId', as: 'provenanceDocs' });

ProvenanceDoc.belongsTo(User, { foreignKey: 'verifiedBy', as: 'verifier' });
User.hasMany(ProvenanceDoc, { foreignKey: 'verifiedBy', as: 'verifiedDocs' });

module.exports = ProvenanceDoc;
