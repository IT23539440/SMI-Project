import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ManageSubject from "./ManageSubjects";
import ManageExam from "./ManageExam";
import Inquiries from "./Inquiries";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("manage-subject");

  const sidebarItems = [
    { label: "Manage Subjects", page: "manage-subject", icon: "📚" },
    { label: "Manage Exams", page: "manage-exam", icon: "📝" },
    { label: "Student Inquiries", page: "inquiries", icon: "💬" },
  ];

  const handleNavigate = (page) => {
    setActivePage(page);
    navigate(`/teacher/${page}`);
  };

  const sidebarStyle = {
    flex: "0 0 220px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  };

  const sidebarItemStyle = (isActive) => ({
    backgroundColor: isActive ? "#1976d2" : "#fff",
    color: isActive ? "#fff" : "#000",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
  });

  const mainStyle = {
    flex: "1 1 auto",
    padding: "20px",
    backgroundColor: "#e6f0ff",
    minHeight: "100vh",
  };

  return (
    <div style={{ display: "flex", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={{ fontWeight: "bold", marginBottom: "20px", fontSize: "18px" }}>
          Teacher Panel
        </div>
        {sidebarItems.map((item) => (
          <div
            key={item.page}
            style={sidebarItemStyle(activePage === item.page)}
            onClick={() => handleNavigate(item.page)}
          >
            <span>{item.icon}</span> {item.label}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <div style={mainStyle}>
        <Routes>
          <Route path="manage-subject" element={<ManageSubject />} />
          <Route path="manage-exam" element={<ManageExam />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="*" element={<ManageSubject />} />
        </Routes>
      </div>
    </div>
  );
}
