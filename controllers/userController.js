const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, phone, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, phone, password: hashedPassword, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const { name, phone, password, role } = req.body;
        const updatedFields = { name, phone, role };

        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
