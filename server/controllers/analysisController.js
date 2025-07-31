const { downloadAllTitlesXml } = require('../utils/fetchEcfr.js');
const { parseXmlFilesAndComputeMetrics } = require('../utils/metrics.js');

async function refreshData(req, res) {
  await downloadAllTitlesXml();
  res.json({ message: 'All XML files downloaded' });
}

function getMetrics(req, res) {
  const metrics = parseXmlFilesAndComputeMetrics();
  res.json(metrics);
}

module.exports = { refreshData, getMetrics };