const Invoice = require('../models/invoiceModel');
const Client = require('../models/clientModel');

// Create Invoice
const createInvoice = async (req, res) => {
    try {
        const { client, items } = req.body;

        // Ensure client exists
        const clientExists = await Client.findById(client);
        if (!clientExists) return res.status(404).json({ error: 'Client not found' });

        // Calculate total
        const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        // Create invoice
        const invoice = await Invoice.create({ client, items, total });
        res.status(201).json(invoice);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Invoices
const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('client', 'name email phone');
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Single Invoice
const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('client', 'name email phone');
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Invoice
const updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

        const { items } = req.body;

        // Recalculate total
        invoice.items = items;
        invoice.total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        await invoice.save();
        res.json(invoice);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Invoice
const deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
        res.json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice };
