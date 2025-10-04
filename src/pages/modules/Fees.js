import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModuleCard from '../../components/ModuleCard';

export default function Fees({ permissions }) {
  const [fees, setFees] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (permissions.includes('read')) {
      axios.get('http://localhost:5000/modules/fees', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setFees(res.data));
    }
  }, [permissions, token]);

  const handleCreate = async () => {
    const student = prompt('Student Name'); if(!student) return;
    const amount = prompt('Amount');
    const status = prompt('Status (Paid/Unpaid)');
    const res = await axios.post('http://localhost:5000/modules/fees', { student, amount, status },
      { headers: { Authorization: `Bearer ${token}` } });
    setFees([...fees, res.data]);
  };

  const handleUpdate = async (id) => {
    const status = prompt('New Status (Paid/Unpaid)'); if(!status) return;
    const res = await axios.put(`http://localhost:5000/modules/fees/${id}`, { status },
      { headers: { Authorization: `Bearer ${token}` } });
    setFees(fees.map(f => f._id === id ? res.data : f));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/modules/fees/${id}`,
      { headers: { Authorization: `Bearer ${token}` } });
    setFees(fees.filter(f => f._id !== id));
  };

  return <ModuleCard moduleName="Fees" items={fees} permissions={permissions} onCreate={handleCreate} onUpdate={handleUpdate} onDelete={handleDelete} />;
}
