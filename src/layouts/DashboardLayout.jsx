import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const userRole = localStorage.getItem("userRole") || "student";

  const links = [];

  if (userRole === "admin" || userRole === "owner") {
    links.push(
      { to: "/users", label: "Users" },
      { to: "/subjects", label: "Subjects" },
      { to: "/exams", label: "Exams" },
      { to: "/inquiries", label: "Inquiries" },
      { to: "/payments", label: "Payments" }
    );
  } else if (userRole === "teacher") {
    links.push(
      { to: "/subjects", label: "Subjects" },
      { to: "/exams", label: "Exams" },
      { to: "/users", label: "Users" }
    );
  } else if (userRole === "finance") {
    links.push(
      { to: "/payments", label: "Payments" },
      { to: "/inquiries", label: "Inquiries" }
    );
  } else if (userRole === "student") {
    links.push(
      { to: "/subjects", label: "Subjects" },
      { to: "/inquiries", label: "Inquiries" }
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-3">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="hover:bg-gray-700 px-3 py-2 rounded-md"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
