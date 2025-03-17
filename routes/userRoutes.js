const express = require('express');
const { protect } = require('../middleware/authMiddleware');  
const { getUsers, getUserById } = require('../controllers/userController');  
const User = require('../models/userModel'); // ✅ Ensure correct import

const router = express.Router();

// ✅ Define `/count` first
router.get('/count', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ✅ Other user routes
router.get('/', protect, getUsers);
router.get('/:id', protect, getUserById);

module.exports = router;
