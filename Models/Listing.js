const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Listing = sequelize.define('Listing', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  bottleDetails: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),  
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'sold', 'archived'),
    defaultValue: 'active',
  },
}, {
  timestamps: true,
});

module.exports = Listing;
