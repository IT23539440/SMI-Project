import React, { useState } from "react";
import TeacherForm from "../../components/teachers/TeacherForm";
import TeacherTable from "../../components/teachers/TeacherTable";

export default function ManageTeachers() {
  const [editingTeacher, setEditingTeacher] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#1976d2", marginBottom: "20px" }}>Manage Teachers</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TeacherForm
          editingTeacher={editingTeacher}
          setEditingTeacher={setEditingTeacher}
        />
        <TeacherTable setEditingTeacher={setEditingTeacher} />
      </div>
    </div>
  );
}
