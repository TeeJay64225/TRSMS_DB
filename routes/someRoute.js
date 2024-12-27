const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('This is the /api/someRoute endpoint');
});

module.exports = router;
