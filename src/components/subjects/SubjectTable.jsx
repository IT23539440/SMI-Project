// src/components/subject/SubjectTable.jsx
import React from "react";

export default function SubjectTable({ subjects, onEdit, onDelete }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead style={{ backgroundColor: "#1976d2", color: "#fff" }}>
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>Department</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {subjects.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>
              No subjects found
            </td>
          </tr>
        ) : (
          subjects.map((sub) => (
            <tr key={sub._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{sub.name}</td>
              <td>{sub.code}</td>
              <td>{sub.department || "-"}</td>
              <td>{sub.description || "-"}</td>
              <td>
                <button
                  style={{ marginRight: "5px" }}
                  onClick={() => onEdit(sub)}
                >
                  Edit
                </button>
                <button onClick={() => onDelete(sub._id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
