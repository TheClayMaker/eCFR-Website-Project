const fs = require('fs');
const path = require('path');
const axios = require('axios');

const XML_DIR = path.join(__dirname, '../data');

async function downloadAllTitlesXml() {
  if (!fs.existsSync(XML_DIR)) fs.mkdirSync(XML_DIR, { recursive: true });

  const titles = Array.from({ length: 50 }, (_, i) => i + 1); // Title 1 to 50

  for (const title of titles) {
    try {
      const url = `https://www.ecfr.gov/api/versioner/v1/full/2025-07-24/title-${title}.xml`;
      const response = await axios.get(url, { responseType: 'text' });
      fs.writeFileSync(path.join(XML_DIR, `title-${title}.xml`), response.data);
      console.log(`Downloaded Title ${title}`);
    } catch (err) {
      console.warn(`Failed to download Title ${title}:`, err.message);
    }
  }
}

module.exports = { downloadAllTitlesXml };