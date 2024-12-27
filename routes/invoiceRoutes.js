const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
} = require('../controllers/invoiceController');

router.post('/', protect, createInvoice);          // Create an invoice
router.get('/', protect, getInvoices);            // Get all invoices
router.get('/:id', protect, getInvoiceById);      // Get a single invoice by ID
router.put('/:id', protect, updateInvoice);       // Update an invoice
router.delete('/:id', protect, deleteInvoice);    // Delete an invoice

module.exports = router;
