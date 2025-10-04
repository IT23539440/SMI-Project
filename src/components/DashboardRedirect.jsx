// src/components/DashboardRedirect.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const DashboardRedirect = ({ user }) => {
  if (!user || !user.role) {
    // If no user or role, redirect to login
    return <Navigate to="/" />;
  }

  switch (user.role) {
    case "student":
      return <Navigate to="/student-dashboard" />;
    case "teacher":
      return <Navigate to="/teacher/dashboard" />;
    case "admin":
      return <Navigate to="/admin/dashboard" />;
    case "finance":
      return <Navigate to="/finance/dashboard" />;
    default:
      return <Navigate to="/" />;
  }
};

export default DashboardRedirect;
