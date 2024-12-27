const Client = require('../models/clientModel');

// Create a new client
const createClient = async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all clients
const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single client by ID
const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a client by ID
const updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a client by ID
const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const addVisit = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) throw new Error('Client not found');
        client.visits.push(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createClient, getClients, getClientById, updateClient, deleteClient , addVisit };
