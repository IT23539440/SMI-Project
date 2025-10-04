import React, { useEffect, useState } from 'react';
import axios from 'axios';

const moduleApiMap = {
  Courses: '/modules/courses',
  Assignments: '/modules/assignments',
  Exams: '/modules/exams',
  Fees: '/modules/fees',
  Compliance: '/modules/compliance'
};

export default function MainContent({ modules }) {
  const token = localStorage.getItem('token');
  const [data, setData] = useState({}); // { Courses: [], Assignments: [], ... }

  // Fetch data for all modules
  useEffect(() => {
    modules.forEach(async m => {
      if (m.permissions.includes('read') && moduleApiMap[m.module]) {
        const res = await axios.get(`http://localhost:5000${moduleApiMap[m.module]}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(prev => ({ ...prev, [m.module]: res.data }));
      }
    });
  }, [modules, token]);

  // CRUD handlers
  const handleCreate = async (module) => {
    const obj = {};
    switch(module){
      case 'Courses':
        obj.name = prompt('Course Name'); if(!obj.name) return;
        obj.description = prompt('Description');
        obj.duration = prompt('Duration');
        break;
      case 'Assignments':
        obj.title = prompt('Assignment Title'); if(!obj.title) return;
        obj.description = prompt('Description');
        obj.dueDate = prompt('Due Date (YYYY-MM-DD)');
        break;
      case 'Exams':
        obj.title = prompt('Exam Title'); if(!obj.title) return;
        obj.date = prompt('Exam Date (YYYY-MM-DD)');
        break;
      case 'Fees':
        obj.student = prompt('Student Name'); if(!obj.student) return;
        obj.amount = prompt('Amount');
        obj.status = prompt('Status');
        break;
      case 'Compliance':
        obj.item = prompt('Compliance Item'); if(!obj.item) return;
        obj.status = prompt('Status');
        break;
      default: return;
    }
    const res = await axios.post(`http://localhost:5000${moduleApiMap[module]}`, obj,
      { headers: { Authorization: `Bearer ${token}` } });
    setData(prev => ({ ...prev, [module]: [...(prev[module]||[]), res.data] }));
  };

  const handleUpdate = async (module, id) => {
    const obj = {};
    switch(module){
      case 'Courses':
        obj.duration = prompt('New Duration'); if(!obj.duration) return; break;
      case 'Assignments':
        obj.title = prompt('New Title'); if(!obj.title) return; break;
      case 'Exams':
        obj.title = prompt('New Title'); if(!obj.title) return; break;
      case 'Fees':
        obj.status = prompt('New Status'); if(!obj.status) return; break;
      case 'Compliance':
        obj.status = prompt('New Status'); if(!obj.status) return; break;
      default: return;
    }
    const res = await axios.put(`http://localhost:5000${moduleApiMap[module]}/${id}`, obj,
      { headers: { Authorization: `Bearer ${token}` } });
    setData(prev => ({ ...prev, [module]: prev[module].map(item=>item._id===id?res.data:item) }));
  };

  const handleDelete = async (module, id) => {
    await axios.delete(`http://localhost:5000${moduleApiMap[module]}/${id}`,
      { headers: { Authorization: `Bearer ${token}` } });
    setData(prev => ({ ...prev, [module]: prev[module].filter(item=>item._id!==id) }));
  };

  return (
    <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
      {modules.map(m => (
        <div key={m.module} style={{ marginBottom: '20px', border: '1px solid #eee', padding: '10px' }}>
          <h2>{m.module}</h2>
          {m.permissions.includes('create') && <button onClick={()=>handleCreate(m.module)}>Create</button>}
          <div style={{ marginTop: '10px' }}>
            {(data[m.module]||[]).map(item => (
              <div key={item._id} style={{ marginTop: '5px', borderBottom: '1px solid #ddd', padding: '5px' }}>
                <span>{JSON.stringify(item)}</span>
                {m.permissions.includes('update') && <button onClick={()=>handleUpdate(m.module,item._id)}>Edit</button>}
                {m.permissions.includes('delete') && <button onClick={()=>handleDelete(m.module,item._id)}>Delete</button>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
