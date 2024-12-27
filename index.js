// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // No longer necessary for modern MongoDB drivers, but safe to include for older ones
    useUnifiedTopology: true, // No longer necessary for modern MongoDB drivers, but safe to include for older ones
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to TRSMS API');
});

// Import routes
const someRoute = require('./routes/someRoute'); // Example route
app.use('/api/someRoute', someRoute); // Attach route

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
