import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModuleCard from '../../components/ModuleCard';

export default function Assignments({ permissions }) {
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (permissions.includes('read')) {
      axios.get('http://localhost:5000/modules/assignments', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setAssignments(res.data));
    }
  }, [permissions, token]);

  const handleCreate = async () => {
    const title = prompt('Assignment Title'); if(!title) return;
    const description = prompt('Description');
    const dueDate = prompt('Due Date (YYYY-MM-DD)');
    const res = await axios.post('http://localhost:5000/modules/assignments', { title, description, dueDate },
      { headers: { Authorization: `Bearer ${token}` } });
    setAssignments([...assignments, res.data]);
  };

  const handleUpdate = async (id) => {
    const title = prompt('New Title'); if(!title) return;
    const res = await axios.put(`http://localhost:5000/modules/assignments/${id}`, { title },
      { headers: { Authorization: `Bearer ${token}` } });
    setAssignments(assignments.map(a => a._id === id ? res.data : a));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/modules/assignments/${id}`,
      { headers: { Authorization: `Bearer ${token}` } });
    setAssignments(assignments.filter(a => a._id !== id));
  };

  return <ModuleCard moduleName="Assignments" items={assignments} permissions={permissions} onCreate={handleCreate} onUpdate={handleUpdate} onDelete={handleDelete} />;
}
