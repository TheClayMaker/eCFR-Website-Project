import React, { useEffect, useState } from 'react';
import { fetchMetrics, refreshData } from './api';
import MetricTable from './components/MetricTable';

function App() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetchMetrics().then(setMetrics);
  }, []);

  const handleRefresh = async () => {
    await refreshData();
    const newMetrics = await fetchMetrics();
    console.log(newMetrics);
    setMetrics(newMetrics);
  };

  return (
    <div>
      <h1>eCFR Data Metrics</h1>
      <button onClick={handleRefresh}>Refresh Data</button>
      {metrics ? <MetricTable metrics={metrics} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;