const express = require('express');
const { protect } = require('../middleware/authMiddleware');  // ✅ Import middleware
const { getUsers, getUserById } = require('../controllers/userController');  // ✅ Import user controllers

const router = express.Router();

// Define user-related routes
router.get('/', protect, getUsers);   // Get all users (protected)
router.get('/:id', protect, getUserById);  // Get a user by ID (protected)

module.exports = router;
