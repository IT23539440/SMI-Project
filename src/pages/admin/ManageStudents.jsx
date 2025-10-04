import React, { useState } from "react";
import StudentForm from "../../components/students/StudentForm";
import StudentTable from "../../components/students/StudentTable";

export default function ManageStudents() {
  const [editingStudent, setEditingStudent] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#1976d2", marginBottom: "20px" }}>Manage Students</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <StudentForm
          editingStudent={editingStudent}
          setEditingStudent={setEditingStudent}
        />
        <StudentTable setEditingStudent={setEditingStudent} />
      </div>
    </div>
  );
}
