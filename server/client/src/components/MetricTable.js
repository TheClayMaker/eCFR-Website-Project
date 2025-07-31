import React from 'react';

export default function MetricTable({ metrics }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Agency</th>
          <th>Word Count</th>
          <th>Checksum</th>
          <th>Last Modified</th>
          <th>Complexity</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(metrics).map(([agency, m]) => (
          <tr key={agency}>
            <td>{agency}</td>
            <td>{m.wordCount}</td>
            <td>{m.checksum}</td>
            <td>{m.lastMod}</td>
            <td>{m.complexity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}