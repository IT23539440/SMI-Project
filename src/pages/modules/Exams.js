import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModuleCard from '../../components/ModuleCard';

export default function Exams({ permissions }) {
  const [exams, setExams] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (permissions.includes('read')) {
      axios.get('http://localhost:5000/modules/exams', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setExams(res.data));
    }
  }, [permissions, token]);

  const handleCreate = async () => {
    const title = prompt('Exam Title'); if(!title) return;
    const date = prompt('Exam Date (YYYY-MM-DD)');
    const res = await axios.post('http://localhost:5000/modules/exams', { title, date },
      { headers: { Authorization: `Bearer ${token}` } });
    setExams([...exams, res.data]);
  };

  const handleUpdate = async (id) => {
    const title = prompt('New Title'); if(!title) return;
    const res = await axios.put(`http://localhost:5000/modules/exams/${id}`, { title },
      { headers: { Authorization: `Bearer ${token}` } });
    setExams(exams.map(e => e._id === id ? res.data : e));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/modules/exams/${id}`,
      { headers: { Authorization: `Bearer ${token}` } });
    setExams(exams.filter(e => e._id !== id));
  };

  return <ModuleCard moduleName="Exams" items={exams} permissions={permissions} onCreate={handleCreate} onUpdate={handleUpdate} onDelete={handleDelete} />;
}
