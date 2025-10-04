// src/pages/compliance/Compliance.jsx
import React, { useState, useEffect } from "react";
import InquiryForm from "../../components/compliance/InquiryForm";
import InquiryTable from "../../components/compliance/InquiryTable";
import apiClient from "../../api/apiClient";

export default function Compliance({ user }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      let url = "/inquiries";
      // students see only their own
      if (user.role === "Student") url = `/inquiries/student/${user._id}`;
      const { data } = await apiClient.get(url);
      setInquiries(data);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "#1976d2", marginBottom: "20px" }}>
        Compliance & Inquiries
      </h2>

      {/* Student view: form */}
      {user.role === "Student" && (
        <>
          <h3>Submit Inquiry</h3>
          <InquiryForm studentId={user._id} onSuccess={fetchInquiries} />
        </>
      )}

      {/* Admin/Teacher/Finance view: table */}
      {user.role !== "Student" && (
        <>
          <h3>All Inquiries</h3>
          {loading ? (
            <p>Loading inquiries...</p>
          ) : (
            <InquiryTable inquiries={inquiries} refresh={fetchInquiries} userRole={user.role} />
          )}
        </>
      )}

      {/* Optional: students see their own submitted inquiries */}
      {user.role === "Student" && (
        <>
          <h3>My Inquiries</h3>
          {loading ? (
            <p>Loading inquiries...</p>
          ) : (
            <InquiryTable inquiries={inquiries} refresh={fetchInquiries} userRole={user.role} />
          )}
        </>
      )}
    </div>
  );
}
