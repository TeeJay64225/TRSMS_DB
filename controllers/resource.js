const Resource = require('../models/Resource');

// Get all resources
const getResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new resource
const createResource = async (req, res) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getResources, createResource };
