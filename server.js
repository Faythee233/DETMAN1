const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

// Load env vars
dotenv.config();

const app = express();

// Connect to local SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dev.sqlite',
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to local SQLite database (dev.sqlite)');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('SQLite connection error:', err);
    process.exit(1);
  });

module.exports = app;
