const express = require('express');
const { protect } = require('../middleware/authMiddleware');  
const { getUsers, getUserById } = require('../controllers/userController');  
const User = require('../models/User'); // ✅ Ensure correct import

const router = express.Router();

// ✅ Move this route **above** the `/:id` route
router.get('/count', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ✅ Define user-related routes
router.get('/', protect, getUsers);   // Get all users (protected)
router.get('/:id', protect, getUserById);  // Get a user by ID (protected)

module.exports = router;
