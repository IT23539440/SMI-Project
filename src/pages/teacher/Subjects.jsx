// src/pages/teacher/ManageSubject.jsx
import React, { useState, useEffect } from "react";
import SubjectForm from "../../components/subjects/SubjectForm";
import SubjectTable from "../../components/subjects/SubjectTable";
import apiClient from "../../api/apiClient"; // your axios instance

export default function ManageSubject() {
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);

  // Fetch all subjects
  const fetchSubjects = async () => {
    try {
      const { data } = await apiClient.get("/subjects");
      setSubjects(data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Delete subject
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/subjects/${id}`);
      fetchSubjects(); // refresh list
    } catch (err) {
      console.error("Error deleting subject:", err);
    }
  };

  return (
    <div>
      <h2>Manage Subjects..............</h2>

      {/* Subject Form */}
      <SubjectForm
        subject={editingSubject}
        onSuccess={() => {
          setEditingSubject(null);
          fetchSubjects();
        }}
      />

      {/* Subject Table */}
      <SubjectTable
        subjects={subjects}
        onEdit={(subject) => setEditingSubject(subject)}
        onDelete={handleDelete}
      />
    </div>
  );
}
