import React from "react";
import { useNavigate } from "react-router-dom";
import InquiryForm from "../../components/compliance/InquiryForm";
import InquiryTable from "../../components/compliance/InquiryTable";

const CreateInquiry = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate("/student-dashboard")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          borderRadius: "6px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>Create Inquiry</h1>

      {role === "student" && (
        <>
          <h2>Raise an Inquiry</h2>
          <InquiryForm />
        </>
      )}

      <h2 style={{ marginTop: "40px" }}>Your Inquiries</h2>
      <InquiryTable role={role} />
    </div>
  );
};

export default CreateInquiry;
