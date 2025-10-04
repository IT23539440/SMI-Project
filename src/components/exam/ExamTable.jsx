// src/components/exams/ExamTableSimple.jsx
import React from "react";

export default function ExamTableSimple({ exams, onEdit, onDelete }) {
  const thtd = { border: "1px solid #ccc", padding: "8px", textAlign: "left" };
  const buttonStyle = { marginRight: "5px", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer" };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
      <thead>
        <tr style={{ backgroundColor: "#f0f4ff" }}>
          <th style={thtd}>Exam Name</th>
          <th style={thtd}>Subject</th>
          <th style={thtd}>Grade</th>
          <th style={thtd}>Date</th>
          <th style={thtd}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exams.map((exam) => (
          <tr key={exam._id}>
            <td style={thtd}>{exam.name}</td>
            <td style={thtd}>{exam.subject}</td>
            <td style={thtd}>{exam.grade}</td>
            <td style={thtd}>{exam.examDate}</td>
            <td style={thtd}>
              <button style={{ ...buttonStyle, backgroundColor: "#1976d2", color: "#fff" }} onClick={() => onEdit(exam)}>Edit</button>
              <button style={{ ...buttonStyle, backgroundColor: "red", color: "#fff" }} onClick={() => onDelete(exam._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
