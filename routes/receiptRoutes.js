const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    createReceipt,
    getReceipts,
    getReceiptById,
    updateReceipt,
    deleteReceipt
} = require('../controllers/receiptController');

const router = express.Router();

router.post('/', protect, createReceipt);
router.get('/', protect, getReceipts);
router.get('/:id', protect, getReceiptById);
router.put('/:id', protect, updateReceipt);
router.delete('/:id', protect, deleteReceipt);

module.exports = router;  // ✅ Correct export
