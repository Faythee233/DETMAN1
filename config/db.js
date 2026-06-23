const { Sequelize } = require('sequelize');

// Create Sequelize instance for SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // file-based SQLite DB
  logging: false // optional: disable SQL logs
});

module.exports = sequelize;
