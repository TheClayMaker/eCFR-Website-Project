const express = require('express');
const router = express.Router();
const { refreshData, getMetrics } = require('../controllers/analysisController');

router.get('/refresh', refreshData);
router.get('/metrics', getMetrics);

module.exports = router;