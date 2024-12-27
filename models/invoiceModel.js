const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    items: [
        {
            description: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
