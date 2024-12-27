const Receipt = require('../models/receiptModel');
const Invoice = require('../models/invoiceModel');

// Create a receipt
const createReceipt = async (req, res) => {
    try {
        const { invoice, amountPaid, paymentMethod, notes } = req.body;

        // Check if the invoice exists
        const existingInvoice = await Invoice.findById(invoice);
        if (!existingInvoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        const receipt = await Receipt.create({ invoice, amountPaid, paymentMethod, notes });
        res.status(201).json(receipt);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all receipts
const getReceipts = async (req, res) => {
    try {
        const receipts = await Receipt.find().populate('invoice');
        res.json(receipts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single receipt by ID
const getReceiptById = async (req, res) => {
    try {
        const receipt = await Receipt.findById(req.params.id).populate('invoice');
        if (!receipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }
        res.json(receipt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a receipt
const updateReceipt = async (req, res) => {
    try {
        const { amountPaid, paymentMethod, notes } = req.body;
        const receipt = await Receipt.findByIdAndUpdate(
            req.params.id,
            { amountPaid, paymentMethod, notes },
            { new: true, runValidators: true }
        );

        if (!receipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }
        res.json(receipt);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a receipt
const deleteReceipt = async (req, res) => {
    try {
        const receipt = await Receipt.findByIdAndDelete(req.params.id);
        if (!receipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }
        res.json({ message: 'Receipt deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createReceipt, getReceipts, getReceiptById, updateReceipt, deleteReceipt };
