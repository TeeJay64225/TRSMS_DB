const express = require('express');
const { protect } = require('../middleware/authMiddleware');  // ✅ Import middleware
const { getUsers, getUserById } = require('../controllers/userController');  // ✅ Import user controllers
const User = require('../models/userModel'); // ✅ Corrected import

const router = express.Router();

// Get total user count
router.get('/count', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all users (protected)
router.get('/', protect, getUsers);

// Get a user by ID (protected)
router.get('/:id', protect, getUserById);

module.exports = router;
