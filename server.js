const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const User = require('./models/User'); // import all models so Sequelize knows them

// Load env vars
dotenv.config();

const app = express();

// Important: capture raw body for signature verification
app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf }
}));

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const provenanceRoutes = require('./routes/provenanceRoutes');
const paystackRoutes = require('./routes/paystackRoutes');
const adminRoutes = require('./routes/adminRoutes')
// Mount routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/listings', listingRoutes);
app.use('/transactions', transactionRoutes);
app.use('/provenance', provenanceRoutes);
app.use('/paystack', paystackRoutes);
app.use('/admin', adminRoutes);




sequelize.sync({ alter: true }) // or { force: true } in dev
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => console.error('Sync error:', err));





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
