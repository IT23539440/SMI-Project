import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModuleCard from '../../components/ModuleCard';

export default function Compliance({ permissions }) {
  const [compliances, setCompliances] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (permissions.includes('read')) {
      axios.get('http://localhost:5000/modules/compliance', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setCompliances(res.data));
    }
  }, [permissions, token]);

  const handleCreate = async () => {
    const item = prompt('Compliance Item'); if(!item) return;
    const status = prompt('Status (Complete/Incomplete)');
    const res = await axios.post('http://localhost:5000/modules/compliance', { item, status },
      { headers: { Authorization: `Bearer ${token}` } });
    setCompliances([...compliances, res.data]);
  };

  const handleUpdate = async (id) => {
    const status = prompt('New Status (Complete/Incomplete)'); if(!status) return;
    const res = await axios.put(`http://localhost:5000/modules/compliance/${id}`, { status },
      { headers: { Authorization: `Bearer ${token}` } });
    setCompliances(compliances.map(c => c._id === id ? res.data : c));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/modules/compliance/${id}`,
      { headers: { Authorization: `Bearer ${token}` } });
    setCompliances(compliances.filter(c => c._id !== id));
  };

  return <ModuleCard moduleName="Compliance" items={compliances} permissions={permissions} onCreate={handleCreate} onUpdate={handleUpdate} onDelete={handleDelete} />;
}
