import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardRedirect from "./components/DashboardRedirect";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageTeachers from "./pages/admin/ManageTeachers";
// src/App.jsx
import AdminRoute from "./routes/AdminRoute"; // <-- add this

// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ManageSubject from "./pages/teacher/ManageSubjects";
import ManageExam from "./pages/teacher/ManageExam";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import CreateInquiry from "./pages/student/CreateInquiry";

// Finance
import FinanceDashboard from "./pages/finance/FinanceDashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />

        {/* Dashboard Redirect */}
        <Route
  path="/dashboard"
  element={
    currentUser ? <DashboardRedirect user={currentUser} /> : <Navigate to="/" />
  }
/>


        <Route
  path="/admin/dashboard"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
<Route
  path="/admin/manage-students"
  element={
    <AdminRoute>
      <ManageStudents />
    </AdminRoute>
  }
/>
<Route
  path="/admin/manage-users"
  element={
    <AdminRoute>
      <ManageTeachers />
    </AdminRoute>
  }
/>
3️⃣ En

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/manage-subject" element={<ManageSubject />} />
        <Route path="/teacher/manage-exam" element={<ManageExam />} />

        {/* Student Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student/create-inquiry" element={<CreateInquiry />} />

        {/* Finance Route */}
        <Route path="/finance/dashboard" element={<FinanceDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
