const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    service: { type: String, required: true },
    technician: { type: String, required: true },
    cost: { type: Number, required: true },
}, { timestamps: true });

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    visits: [visitSchema],
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
