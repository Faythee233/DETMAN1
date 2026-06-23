const User = require('../models/User');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('User fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('User fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update user profile
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { username, email } = req.body;
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error('User update error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('User delete error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
