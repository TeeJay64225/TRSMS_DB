const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {    
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
    addVisit 
} = require('../controllers/clientController');

const router = express.Router();

// Routes for clients
router.post('/', protect, createClient);
router.get('/', protect, getClients);
router.get('/:id', protect, getClientById);
router.put('/:id', protect, updateClient);
router.delete('/:id', protect, deleteClient);
router.post('/:id/visits', protect, addVisit);

module.exports = router;  // ✅ Correct export
