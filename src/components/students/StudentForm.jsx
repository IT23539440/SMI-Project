import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addStudent, updateStudent } from "../../redux/usersSlice";

const StudentForm = ({ editingStudent, setEditingStudent }) => {
  const dispatch = useDispatch();

  const initialState = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    photo: "",
    email: "",
    phone: "",
    address: "",
    parentName: "",
    parentPhone: "",
    studentId: "",
    grade: "",
    section: "",
    enrollmentDate: "",
    previousSchool: "",
    username: "",
    password: "",
    role: "student",
    emergencyContact: "",
    medicalInfo: "",
    interests: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingStudent) setFormData(editingStudent);
  }, [editingStudent]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (editingStudent) {
      dispatch(updateStudent(formData));
      setEditingStudent(null);
    } else {
      dispatch(addStudent({ ...formData, id: Date.now() }));
    }
    setFormData(initialState);
  };

  const sectionStyle = {
    backgroundColor: "#f0f4ff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    borderLeft: "5px solid #1976d2",
  };
  const inputStyle = { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" };
  const textareaStyle = { ...inputStyle, minHeight: "60px" };
  const buttonStyle = { padding: "12px 20px", backgroundColor: "#1976d2", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginRight: "10px" };
  const cancelStyle = { ...buttonStyle, backgroundColor: "#ccc", color: "#333" };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: "20px" }}>
        {editingStudent ? "Edit Student" : "Add New Student"}
      </h2>

      {/* Basic Personal Details */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#1976d2" }}>Basic Personal Details</h3>
        <input style={inputStyle} name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input style={inputStyle} name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input style={inputStyle} type="date" name="dob" value={formData.dob} onChange={handleChange} />
        <select style={inputStyle} name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Contact Info */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#1976d2" }}>Contact Information</h3>
        <input style={inputStyle} name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input style={inputStyle} name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <textarea style={textareaStyle} name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input style={inputStyle} name="parentName" placeholder="Parent Name" value={formData.parentName} onChange={handleChange} />
        <input style={inputStyle} name="parentPhone" placeholder="Parent Phone" value={formData.parentPhone} onChange={handleChange} />
      </div>

      {/* Academic Details */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#1976d2" }}>Academic Details</h3>
        <input style={inputStyle} name="studentId" placeholder="Student ID" value={formData.studentId} onChange={handleChange} />
        <input style={inputStyle} name="grade" placeholder="Grade/Class" value={formData.grade} onChange={handleChange} />
        <input style={inputStyle} name="section" placeholder="Section" value={formData.section} onChange={handleChange} />
      </div>

      {/* Login */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#1976d2" }}>Login Credentials</h3>
        <input style={inputStyle} name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input style={inputStyle} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      </div>

      {/* Optional */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#1976d2" }}>Optional Info</h3>
        <input style={inputStyle} name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} />
        <textarea style={textareaStyle} name="medicalInfo" placeholder="Medical Info" value={formData.medicalInfo} onChange={handleChange} />
        <textarea style={textareaStyle} name="interests" placeholder="Interests" value={formData.interests} onChange={handleChange} />
        <textarea style={textareaStyle} name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button type="submit" style={buttonStyle}>{editingStudent ? "Update Student" : "Add Student"}</button>
        {editingStudent && <button type="button" style={cancelStyle} onClick={() => setEditingStudent(null)}>Cancel</button>}
      </div>
    </form>
  );
};

export default StudentForm;
