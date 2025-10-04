import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    // For now, we just save the role in localStorage
    localStorage.setItem("userRole", role);

    // You could also save username if needed
    localStorage.setItem("username", username);

    // Navigate to dashboard after registration
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f7ff",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Register</h2>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          width: "200px",
        }}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          width: "200px",
        }}
      >
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
        <option value="finance">Finance</option>
        <option value="owner">Owner</option>
      </select>

      <button
        onClick={handleRegister}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          background: "#10b981",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
