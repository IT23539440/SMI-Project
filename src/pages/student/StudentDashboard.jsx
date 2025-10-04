import React from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <p>Loading user info...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.name}</h1>
      <button
        onClick={() => navigate("/student/create-inquiry")}
        style={{
          padding: "8px 16px",
          marginBottom: "20px",
          background: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Create Inquiry
      </button>
      {/* Add other dashboard content here */}
    </div>
  );
};

export default StudentDashboard;
