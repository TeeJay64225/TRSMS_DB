const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Optional: System actions may not have a user
    action: { type: String, required: true },  // e.g., "User Login", "Data Deleted"
    details: { type: String, required: true }, // Extra info like "Deleted Invoice #123"
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Log", logSchema);
