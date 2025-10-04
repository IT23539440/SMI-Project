import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModuleCard from '../../components/ModuleCard';

export default function Courses({ permissions }) {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (permissions.includes('read')) {
      axios.get('http://localhost:5000/modules/courses', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setCourses(res.data));
    }
  }, [permissions, token]);

  const handleCreate = async () => {
    const name = prompt('Course Name'); if(!name) return;
    const description = prompt('Description');
    const duration = prompt('Duration');
    const res = await axios.post('http://localhost:5000/modules/courses', { name, description, duration },
      { headers: { Authorization: `Bearer ${token}` } });
    setCourses([...courses, res.data]);
  };

  const handleUpdate = async (id) => {
    const duration = prompt('New Duration'); if(!duration) return;
    const res = await axios.put(`http://localhost:5000/modules/courses/${id}`, { duration },
      { headers: { Authorization: `Bearer ${token}` } });
    setCourses(courses.map(c => c._id === id ? res.data : c));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/modules/courses/${id}`,
      { headers: { Authorization: `Bearer ${token}` } });
    setCourses(courses.filter(c => c._id !== id));
  };

  return <ModuleCard moduleName="Courses" items={courses} permissions={permissions} onCreate={handleCreate} onUpdate={handleUpdate} onDelete={handleDelete} />;
}
