const express = require('express');
const router = express.Router();
const  authenticate = require('../middleware/authMiddleware');
 const  authorizeRole  = require('../middleware/roleMiddleware');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Get all users
router.get('/',authenticate, getUsers);

// Get user by ID
router.get('/:id', authenticate, getUserById);

// Update user
router.put('/:id', authenticate, updateUser);

// Delete user
router.delete('/:id', authenticate, authorizeRole('admin'), deleteUser);

module.exports = router;
