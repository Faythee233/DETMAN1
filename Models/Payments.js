const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Listing = require('./Listing');

const Transaction = sequelize.define('Payments', {
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


module.exports = Transaction;
