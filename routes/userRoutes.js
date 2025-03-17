const express = require('express');
const { protect } = require('../middleware/authMiddleware');  
const { getUsers, getUserById } = require('../controllers/userController');  
const User = require('../models/userModel'); // Ensure correct import

const router = express.Router();

// ✅ Debugging Middleware - Log requests
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// ✅ Get total user count
router.get('/count', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ✅ Get all users (Requires Authentication)
router.get('/', protect, async (req, res) => {
    try {
        console.log("Incoming request to fetch users");
        const users = await User.find({}, "name phone role lastActive status");
        
        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }

        console.log("Fetched users:", users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ✅ Get a single user by ID (Requires Authentication)
router.get('/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id, "name phone role lastActive status");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
