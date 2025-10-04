// src/components/subject/SubjectForm.jsx
import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

export default function SubjectForm({ subject = null, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    department: "",
    teacherIds: [],
  });

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await apiClient.get("/users?role=teacher");
        setTeachers(data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name || "",
        code: subject.code || "",
        description: subject.description || "",
        department: subject.department || "",
        teacherIds: subject.teacherIds || [],
      });
    }
  }, [subject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTeacherChange = (e) => {
    const options = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setFormData({ ...formData, teacherIds: options });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (subject?._id) {
        await apiClient.put(`/subjects/${subject._id}`, formData);
      } else {
        await apiClient.post("/subjects", formData);
      }
      setFormData({
        name: "",
        code: "",
        description: "",
        department: "",
        teacherIds: [],
      });
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error saving subject.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };
  const textareaStyle = { ...inputStyle, minHeight: "60px" };
  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "#1976d2" }}>
        {subject ? "Edit Subject" : "Add Subject"}
      </h2>

      <input
        style={inputStyle}
        name="name"
        placeholder="Subject Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="code"
        placeholder="Subject Code"
        value={formData.code}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
      />
      <textarea
        style={textareaStyle}
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <label>Assign Teachers:</label>
      <select
        style={inputStyle}
        multiple
        value={formData.teacherIds}
        onChange={handleTeacherChange}
      >
        {teachers.map((t) => (
          <option key={t._id} value={t._id}>
            {t.firstName} {t.lastName}
          </option>
        ))}
      </select>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <button type="submit" style={buttonStyle}>
          {subject ? "Update" : "Add"} Subject
        </button>
      </div>
    </form>
  );
}
