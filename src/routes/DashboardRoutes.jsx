// src/routes/DashboardRoutes.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";
import FinanceDashboard from "../pages/finance/FinanceDashboard";

const DashboardRoutes = () => {
  const userRole = localStorage.getItem("userRole") || "student";

  // Map role → dashboard
  const dashboardMap = {
    admin: <AdminDashboard />,
    owner: <AdminDashboard />,
    teacher: <TeacherDashboard />,
    student: <StudentDashboard />,
    finance: <FinanceDashboard />,
  };

  return (
    <div style={{ display: "flex" }}>
      <nav style={{ flex: "0 0 220px", padding: "20px", background: "#eee" }}>
        <h3>Dashboard Menu</h3>
        {userRole === "admin" || userRole === "owner" ? (
          <>
            <Link to="">Admin Dashboard</Link><br />
            <Link to="">Users</Link><br />
            <Link to="">Subjects</Link><br />
            <Link to="">Exams</Link><br />
            <Link to="">Compliance</Link><br />
            <Link to="">Payments</Link>
          </>
        ) : userRole === "teacher" ? (
          <>
            <Link to="">Teacher Dashboard</Link><br />
            <Link to="">Subjects</Link><br />
            <Link to="">Exams</Link>
          </>
        ) : userRole === "finance" ? (
          <>
            <Link to="">Finance Dashboard</Link><br />
            <Link to="">Payments</Link><br />
            <Link to="">Compliance</Link>
          </>
        ) : (
          <>
            <Link to="">Student Dashboard</Link><br />
            <Link to="">Subjects</Link><br />
            <Link to="">Compliance</Link>
          </>
        )}
      </nav>
      <div style={{ flex: "1", padding: "20px" }}>
        <Routes>
          <Route path="" element={dashboardMap[userRole]} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardRoutes;
