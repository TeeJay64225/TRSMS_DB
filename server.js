const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Database Connection
const connectDB = require('./config/db');
connectDB();

// Middleware
const corsOptions = {
    origin: "https://trsms.vercel.app", // Allow frontend requests
    methods: "GET,POST,PUT,DELETE",
    credentials: true // Allow cookies & authorization headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Import routes
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const userRoutes = require('./routes/userRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const logRoutes = require("./routes/logRoutes");

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/clients', clientRoutes);
app.use("/api/logs", logRoutes); // ✅ Logs Endpoint

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is working!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
