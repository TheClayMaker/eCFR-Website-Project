const API_BASE = 'http://localhost:5000/api';

export async function fetchMetrics() {
  const res = await fetch(`${API_BASE}/metrics`);
  return res.json();
}

export async function refreshData() {
  const res = await fetch(`${API_BASE}/refresh`);
  return res.json();
}