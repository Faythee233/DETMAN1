const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true,
    validate: {
      isEmail: true, // Sequelize built-in email check
      is: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i // regex for stricter validation
    }
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  role: { 
    type: DataTypes.ENUM('buyer', 'seller', 'admin'), 
    defaultValue: 'buyer' 
  }
}, {
  timestamps: true,
});

module.exports = User;
