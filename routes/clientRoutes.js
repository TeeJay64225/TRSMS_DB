const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
      addVisit, } = require('../controllers/clientController');

// Routes for clients
router.post('/', protect, createClient);           // Create a new client
router.get('/', protect, getClients);             // Get all clients
router.get('/:id', protect, getClientById);       // Get a client by ID
router.put('/:id', protect, updateClient);        // Update a client by ID
router.delete('/:id', protect, deleteClient);     // Delete a client by ID
router.post('/:id/visits', protect, addVisit);

module.exports = router;
