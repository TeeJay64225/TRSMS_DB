const express = require("express");
const { getLogs } = require("../controllers/logController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Get System Logs (Protected)
router.get("/", protect, getLogs);

module.exports = router;
