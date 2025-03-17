const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
} = require('../controllers/invoiceController');

const router = express.Router();

router.post('/', protect, createInvoice);
router.get('/', protect, getInvoices);
router.get('/:id', protect, getInvoiceById);
router.put('/:id', protect, updateInvoice);
router.delete('/:id', protect, deleteInvoice);

module.exports = router;  // ✅ Correct export
