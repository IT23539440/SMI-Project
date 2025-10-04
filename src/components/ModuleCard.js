import React from 'react';

export default function ModuleCard({ moduleName, items, permissions, onCreate, onUpdate, onDelete }) {
  return (
    <div style={{ marginBottom: '20px', border: '1px solid #eee', padding: '10px' }}>
      <h2>{moduleName}</h2>
      {permissions.includes('create') && <button onClick={onCreate}>Create</button>}
      <div style={{ marginTop: '10px' }}>
        {items.map(item => (
          <div key={item._id} style={{ marginTop: '5px', borderBottom: '1px solid #ddd', padding: '5px' }}>
            <span>
              {moduleName === 'Courses' ? `${item.name} (${item.duration})` :
               moduleName === 'Assignments' ? `${item.title} (Due: ${new Date(item.dueDate).toLocaleDateString()})` :
               moduleName === 'Exams' ? `${item.title} (Date: ${new Date(item.date).toLocaleDateString()})` :
               moduleName === 'Fees' ? `${item.student} - ${item.amount} (${item.status})` :
               moduleName === 'Compliance' ? `${item.item} (${item.status})` : JSON.stringify(item)}
            </span>
            {permissions.includes('update') && <button onClick={() => onUpdate(item._id)}>Edit</button>}
            {permissions.includes('delete') && <button onClick={() => onDelete(item._id)}>Delete</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
