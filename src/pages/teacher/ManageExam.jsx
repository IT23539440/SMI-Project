// src/pages/teacher/manage-exam/ManageExam.jsx
import React, { useState, useEffect } from "react";
import ExamForm from "../../components/exam/ExamForm";
import ExamTable from "../../components/exam/ExamTable";
import apiClient from "../../api/apiClient";

export default function ManageExam({ teacherId }) {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch exams from backend
  const fetchExams = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get("/exams");
      setExams(data);
    } catch (err) {
      console.error("Error fetching exams:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Delete exam
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      await apiClient.delete(`/exams/${id}`);
      fetchExams();
    } catch (err) {
      console.error("Error deleting exam:", err);
    }
  };

  // Called when form successfully adds/updates an exam
  const handleFormSuccess = () => {
    setEditingExam(null);
    fetchExams();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: "20px" }}>
        Manage Exams
      </h2>

      {/* Exam Form */}
      <ExamForm
        exam={editingExam}
        onSuccess={handleFormSuccess}
        teacherId={teacherId} // pass logged-in teacher id
      />

      {/* Exam Table */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ color: "#1976d2", marginBottom: "10px" }}>Exam List</h3>
        {loading ? (
          <p>Loading exams...</p>
        ) : (
          <ExamTable
            exams={exams}
            onEdit={(exam) => setEditingExam(exam)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
