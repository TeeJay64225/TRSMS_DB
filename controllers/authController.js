const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        const { name, phone, password, role } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, phone, password: hashedPassword, role });

        await user.save();  // ✅ This is now properly inside `registerUser`

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });

        if (!user) throw new Error('Invalid credentials');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ❌ Removed the misplaced `user.save()` here

module.exports = { registerUser, loginUser };
