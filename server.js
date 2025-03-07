const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const userRoutes = require('./routes/userRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const receiptRoutes = require('./routes/receiptRoutes');

const app = express();

// Connect to database
connectDB();

// CORS Configuration
const corsOptions = {
    origin: "https://trsms.vercel.app", // Allow frontend requests
    methods: "GET,POST,PUT,DELETE",
    credentials: true // Allow cookies & authorization headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/user', authRoutes);
app.use('/api/client', clientRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is working!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
