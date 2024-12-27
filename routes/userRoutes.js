const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Routes for User CRUD
router.post('/', protect, createUser);        // Create a user
router.get('/', protect, getUsers);          // Get all users
router.get('/:id', protect, getUserById);    // Get a single user by ID
router.put('/:id', protect, updateUser);     // Update a user
router.delete('/:id', protect, deleteUser);  // Delete a user

module.exports = router;
