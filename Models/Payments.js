const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Listing = require('./Listing');

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_escrow', 'completed', 'disputed', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

// Associations
Transaction.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });
Transaction.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });
Transaction.belongsTo(Listing, { foreignKey: 'listingId', as: 'listing' });

User.hasMany(Transaction, { foreignKey: 'buyerId', as: 'purchases' });
User.hasMany(Transaction, { foreignKey: 'sellerId', as: 'sales' });
Listing.hasMany(Transaction, { foreignKey: 'listingId', as: 'transactions' });

module.exports = Transaction;
