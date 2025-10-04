import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

// Map module names to components
import Courses from './modules/Courses';
import Assignments from './modules/Assignments';
import Exams from './modules/Exams';
import Fees from './modules/Fees';
import Compliance from './modules/Compliance';

const moduleComponents = {
  Courses: Courses,
  Assignments: Assignments,
  Exams: Exams,
  Fees: Fees,
  Compliance: Compliance
};

export default function Dashboard() {
  const [modules, setModules] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    axios.get('http://localhost:5000/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setModules(res.data.modules))
    .catch(err => console.log(err));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar modules={modules} onLogout={handleLogout}/>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {modules.map(m => {
          const Component = moduleComponents[m.module];
          return Component ? <Component key={m.module} permissions={m.permissions} /> : null;
        })}
      </div>
    </div>
  );
}
