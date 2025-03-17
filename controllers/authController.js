const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createLog } = require("../controllers/logController");

const registerUser = async (req, res) => {
    try {
        const { name, phone, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, phone, password: hashedPassword, role });

        await user.save();

        // Log registration
        await createLog(user._id, "User Registration", `New user ${user.name} (Phone: ${user.phone}) registered.`);

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "7d" }
        );

        // Log login activity
        await createLog(user._id, "User Login", `User ${user.name} (Phone: ${user.phone}) logged in.`);

        res.json({ message: "Login successful", user, token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { registerUser, loginUser };
