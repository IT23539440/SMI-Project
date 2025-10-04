import React from 'react';

export default function Sidebar({ modules, onLogout }) {
  return (
    <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '20px' }}>
      <h3>Modules</h3>
      <ul>
        {modules.map(m => <li key={m.module}>{m.module}</li>)}
      </ul>
      <button onClick={onLogout} style={{ marginTop: '20px' }}>Logout</button>
    </div>
  );
}
