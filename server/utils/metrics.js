const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const crypto = require('crypto');

const XML_DIR = path.join(__dirname, '../data');

function extractTextFromXml(obj) {
  let text = '';

  function traverse(node) {
    if (typeof node === 'string') {
      text += ' ' + node;
    } else if (typeof node === 'object') {
      for (const key in node) {
        traverse(node[key]);
      }
    }
  }

  traverse(obj);
  return text;
}

function extractAgencyFromXml(obj) {
  let headValue = null;

  function traverse(node) {
    if (headValue) return; // short-circuit if found
    if (typeof node === 'object') {
      for (const key in node) {
        if (key === 'HEAD' && typeof node[key] === 'string') {
          headValue = node[key];
          return;
        }
        traverse(node[key]);
      }
    }
  }

  traverse(obj);
  return headValue || 'Unknown';
}

function extractLastModFromXml(obj) {
  let amdDateValue = null;

  function traverse(node) {
    if (amdDateValue) return; // short-circuit if found
    if (typeof node === 'object') {
      for (const key in node) {
        if (key === 'AMDDATE' && typeof node[key] === 'string') {
          amdDateValue = node[key];
          return;
        }
        traverse(node[key]);
      }
    }
  }

  traverse(obj);
  return amdDateValue || 'Unknown';
}

function parseXmlFilesAndComputeMetrics() {
  const parser = new XMLParser({ ignoreAttributes: false });
  const files = fs.readdirSync(XML_DIR).filter(f => f.endsWith('.xml'));
  const metrics = {};

  for (const file of files) {
    const rawXml = fs.readFileSync(path.join(XML_DIR, file), 'utf-8');
    const parsed = parser.parse(rawXml);
    const text = extractTextFromXml(parsed);
    const words = text.match(/\b\w+\b/g) || [];
    const agency = extractAgencyFromXml(parsed);
    const wordCount = words.length;
    const checksum = crypto.createHash('md5').update(text).digest('hex');
    const lastMod = extractLastModFromXml(parsed);
    const complexity = words.reduce((sum, word) => sum + word.replace(/[^aeiouy]/gi, '').length, 0) / wordCount;

    metrics[agency] = {
      wordCount,
      checksum,
      lastMod,
      complexity: parseFloat(complexity.toFixed(2)),
    };
  }

  return metrics;
}

module.exports = { parseXmlFilesAndComputeMetrics };