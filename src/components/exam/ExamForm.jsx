// src/components/exams/ExamFormSimple.jsx
import React, { useState } from "react";
import apiClient from "../../api/apiClient";

export default function ExamFormSimple({ exam = null, onSuccess }) {
  const initialState = {
    name: "",
    subject: "",
    grade: "",
    examDate: "",
  };

  const [formData, setFormData] = useState(exam || initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (exam?._id) {
        await apiClient.put(`/exams/${exam._id}`, formData);
      } else {
        await apiClient.post("/exams", formData);
      }
      setFormData(initialState);
      onSuccess();
    } catch (err) {
      console.error("Error saving exam:", err);
      alert("Failed to save exam. Check console for details.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: "#f9f9f9", padding: "20px", borderRadius: "10px" }}
    >
      <h3 style={{ color: "#1976d2", marginBottom: "15px" }}>
        {exam ? "Edit Exam" : "Add Exam"}
      </h3>

      <input
        style={inputStyle}
        name="name"
        placeholder="Exam Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        style={inputStyle}
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      <input
        style={inputStyle}
        name="grade"
        placeholder="Grade/Class"
        value={formData.grade}
        onChange={handleChange}
        required
      />

      <input
        style={inputStyle}
        type="date"
        name="examDate"
        value={formData.examDate}
        onChange={handleChange}
        required
      />

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <button type="submit" style={buttonStyle}>
          {exam ? "Update" : "Add"} Exam
        </button>
      </div>
    </form>
  );
}
