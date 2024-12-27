const express = require('express');
const { getResources, createResource } = require('../controllers/resource');
const router = express.Router();

router.route('/')
    .get(getResources)
    .post(createResource);

module.exports = router;
