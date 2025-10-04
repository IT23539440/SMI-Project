import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/api";

// --- Reports Data ---
const reportItems = [
  { label: "Student Reports", path: "/reports/students", icon: "🎓" },
  { label: "Teacher Reports", path: "/reports/teachers", icon: "👨‍🏫" },
  { label: "Finance Reports", path: "/reports/finance", icon: "💰" },
  { label: "Compliance Reports", path: "/reports/compliance", icon: "📝" },
];

// --- Summary Cards Component ---
function SummaryCards({ students, teachers, subjects, revenue }) {
  const summaryCards = [
    { title: "Students", count: students.length, icon: "🎓", color: "#2196f3" },
    { title: "Teachers", count: teachers.length, icon: "👨‍🏫", color: "#1e88e5" },
    { title: "Subjects", count: subjects.length, icon: "📚", color: "#1976d2" },
    { title: "Revenue", count: `$${revenue}`, icon: "💰", color: "#1565c0" },
  ];

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
      {summaryCards.map((card, i) => (
        <div key={i} style={{ flex: "1 1 200px", padding: "20px", borderRadius: "10px", backgroundColor: card.color, color: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <h4 style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "16px" }}>{card.icon} {card.title}</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{card.count}</p>
        </div>
      ))}
    </div>
  );
}

// --- Quick Actions Component ---
function QuickActions({ navigate }) {
  const quickActions = [
    { label: "Manage Teachers", path: "/manage-users", icon: "👨‍🏫" },
    { label: "Manage Students", path: "/manage-students", icon: "🎓" },
    { label: "Manage Subjects", path: "/manage-subjects", icon: "📚" },
    
  ];

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
      {quickActions.map((action, i) => (
        <div
          key={i}
          onClick={() => navigate(action.path)}
          style={{
            flex: "1 1 250px",
            padding: "30px",
            borderRadius: "10px",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span style={{ fontSize: "40px" }}>{action.icon}</span>
          <span style={{ fontSize: "18px" }}>{action.label}</span>
        </div>
      ))}
    </div>
  );
}

// --- Reports Section Component (for Sidebar) ---
function ReportsSection({ navigate }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
      <h4 style={{ color: "#fff", marginBottom: "10px" }}>Reports</h4>
      {reportItems.map((item, i) => (
        <div
          key={i}
          onClick={() => navigate(item.path)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#1565c0",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span style={{ fontSize: "20px" }}>{item.icon}</span>
          {item.label}
        </div>
      ))}
    </div>
  );
}

// --- Notifications Component ---
function Notifications() {
  return (
    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h4 style={{ marginBottom: "10px", fontWeight: "bold" }}>Notifications</h4>
      <ul style={{ paddingLeft: "20px" }}>
        <li>New student registered today</li>
        <li>Teacher submitted a report</li>
        <li>Pending fee payments reminder</li>
        <li>System maintenance scheduled</li>
      </ul>
    </div>
  );
}

// --- Admin Dashboard Main Component ---
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await apiClient.get("/api/admin/dashboard");
      setTeachers(res.data.teachers || []);
      setStudents(res.data.students || []);
      setSubjects(res.data.subjects || []);
      setRevenue(res.data.revenue || 0);
    } catch (err) {
      console.error("Error fetching admin data:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleManageInquiries = () => {
    navigate("/compliance"); // route to Compliance page
  };

  if (loading) return <p>Loading Admin Dashboard...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif", backgroundColor: "#e6f0ff" }}>
      
      {/* Left Sidebar */}
      <div style={{ flex: "0 0 240px", padding: "20px", backgroundColor: "#1976d2" }}>
        <div style={{ color: "#fff", padding: "20px", borderRadius: "10px", marginBottom: "20px", fontWeight: "bold", fontSize: "18px", textAlign: "center" }}>
          Admin Panel
        </div>
        <ReportsSection navigate={navigate} />
      </div>

      {/* Main Content */}
      <div style={{ flex: "1 1 600px", padding: "20px" }}>
        <h2 style={{ marginBottom: "20px", color: "#1976d2" }}>Welcome Admin Dashboard</h2>

        {/* Summary Cards */}
        <SummaryCards students={students} teachers={teachers} subjects={subjects} revenue={revenue} />

        {/* Quick Actions */}
        <QuickActions navigate={navigate} />

        {/* Add Manage Inquiries Button */}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleManageInquiries}
            style={{
              padding: "15px 25px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
            }}
          >
            🛡 Manage Inquiries
          </button>
        </div>

        {/* Notifications */}
        <div style={{ marginTop: "40px" }}>
          <Notifications />
        </div>
      </div>

      {/* Right Sidebar */}
      <div style={{ flex: "0 0 260px", padding: "20px" }}>
        <div style={{ backgroundColor: "#1976d2", color: "#fff", padding: "20px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>
          Finance Snapshot
        </div>
        <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <p>Total Revenue: ${revenue}</p>
          <p>Pending Payments: $2,500</p>
        </div>
      </div>
    </div>
  );
}