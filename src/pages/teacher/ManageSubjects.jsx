import React, { useEffect, useState } from "react";
import SubjectForm from "../../components/subjects/SubjectForm";
import SubjectTable from "../../components/subjects/SubjectTable";
import apiClient from "../../api/apiClient";

export default function ManageSubject() {
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all subjects from backend
  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get("/subjects");
      setSubjects(data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;
    try {
      await apiClient.delete(`/subjects/${id}`);
      fetchSubjects(); // refresh table
    } catch (err) {
      console.error("Error deleting subject:", err);
    }
  };

  // Handle form success (add/update)
  const handleFormSuccess = () => {
    setEditingSubject(null); // clear edit state
    fetchSubjects();          // refresh table
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
      <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: "30px" }}>
        Manage Subjects
      </h2>

      {/* Subject Form */}
      <div style={{ marginBottom: "40px" }}>
        <SubjectForm
          subject={editingSubject}
          onSuccess={handleFormSuccess}
        />
      </div>

      {/* Subject Table */}
      <div>
        <h3 style={{ color: "#1976d2", marginBottom: "15px" }}>Subject List</h3>
        {loading ? (
          <p>Loading subjects...</p>
        ) : (
          <SubjectTable
            subjects={subjects}
            onEdit={(sub) => setEditingSubject(sub)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
