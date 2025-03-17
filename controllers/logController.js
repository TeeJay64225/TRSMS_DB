const Log = require("../models/logModel");

// 🔹 Save Log Entry
const createLog = async (userId, action, details) => {
    try {
        const log = new Log({
            user: userId || null,
            action,
            details
        });
        await log.save();
    } catch (error) {
        console.error("Error saving log:", error);
    }
};

// 🔹 Get All Logs
const getLogs = async (req, res) => {
    try {
        const logs = await Log.find().populate("user", "username").sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createLog, getLogs };
