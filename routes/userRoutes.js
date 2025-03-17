const express = require('express');
const { protect } = require('../middleware/authMiddleware');  // ✅ Import middleware
const { getUsers, getUserById } = require('../controllers/userController');  // ✅ Import user controllers

const router = express.Router();

// Define user-related routes
router.get('/', protect, getUsers);   // Get all users (protected)
router.get('/:id', protect, getUserById);  // Get a user by ID (protected)


router.get('/count', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;