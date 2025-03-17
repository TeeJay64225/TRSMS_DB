const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// Create a new user
const createUser = asyncHandler(async (req, res) => {
    const { name, phone, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ phone });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, phone, password: hashedPassword, role });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            phone: user.phone,
            role: user.role,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

// Get all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password'); // Exclude password
    res.status(200).json(users);
});

// Get a single user by ID
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
});

// Update a user
const updateUser = asyncHandler(async (req, res) => {
    const { name, phone, password, role } = req.body;
    const updatedFields = { name, phone, role };

    if (password) {
        updatedFields.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true }).select('-password');

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
});

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
