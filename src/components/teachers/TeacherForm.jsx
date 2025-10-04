import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTeacher, updateTeacher } from "../../redux/usersSlice";

const TeacherForm = ({ editingTeacher, setEditingTeacher }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    photo: "",
    email: "",
    phone: "",
    address: "",
    teacherId: "",
    department: "",
    joiningDate: "",
    username: "",
    password: "",
    role: "teacher",
    notes: "",
  });

  useEffect(() => {
    if (editingTeacher) setFormData(editingTeacher);
  }, [editingTeacher]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTeacher) {
      dispatch(updateTeacher(formData));
      setEditingTeacher(null);
    } else {
      dispatch(addTeacher({ ...formData, id: Date.now() }));
    }
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      photo: "",
      email: "",
      phone: "",
      address: "",
      teacherId: "",
      department: "",
      joiningDate: "",
      username: "",
      password: "",
      role: "teacher",
      notes: "",
    });
  };

  const sectionStyle = {
    backgroundColor: "#f0f4ff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    borderLeft: "5px solid #1976d2",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const textareaStyle = { ...inputStyle, minHeight: "60px" };
  const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
  };
  const cancelStyle = { ...buttonStyle, backgroundColor: "#ccc", color: "#333" };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif" }}
    >
      <h2 style={{ marginBottom: "20px", color: "#1976d2", textAlign: "center" }}>
        {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
      </h2>

      {/* 1. Basic Personal Details */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#1976d2", marginBottom: "10px" }}>Basic Personal Details</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input style={inputStyle} name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input style={inputStyle} name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input style={inputStyle} type="date" name="dob" value={formData.dob} onChange={handleChange} />
          <select style={inputStyle} name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <input style={inputStyle} type="url" name="photo" placeholder="Photo URL (optional)" value={formData.photo} onChange={handleChange} />
      </div>

      {/* 2. Contact Information */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#1976d2", marginBottom: "10px" }}>Contact Information</h3>
        <input style={inputStyle} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input style={inputStyle} name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
        <textarea style={textareaStyle} name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
      </div>

      {/* 3. Professional Details */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#1976d2", marginBottom: "10px" }}>Professional Details</h3>
        <input style={inputStyle} name="teacherId" placeholder="Teacher ID" value={formData.teacherId} onChange={handleChange} />
        <input style={inputStyle} name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
        <input style={inputStyle} type="date" name="joiningDate" placeholder="Joining Date" value={formData.joiningDate} onChange={handleChange} />
      </div>

      {/* 4. Login Credentials */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#1976d2", marginBottom: "10px" }}>Login Credentials</h3>
        <input style={inputStyle} name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input style={inputStyle} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input style={{ ...inputStyle, backgroundColor: "#e0e0e0" }} name="role" value="teacher" readOnly />
      </div>

      {/* 5. Optional / Notes */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#1976d2", marginBottom: "10px" }}>Optional Info / Notes</h3>
        <textarea style={textareaStyle} name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button type="submit" style={buttonStyle}>{editingTeacher ? "Update Teacher" : "Add Teacher"}</button>
        {editingTeacher && <button type="button" style={cancelStyle} onClick={() => setEditingTeacher(null)}>Cancel</button>}
      </div>
    </form>
  );
};

export default TeacherForm;
