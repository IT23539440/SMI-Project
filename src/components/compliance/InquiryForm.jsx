import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchInquiries } from "../../redux/inquiriesSlice";
import api from "../../axiosInstance"; // axios instance

const InquiryForm = () => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure token is sent in Authorization header
      const token = localStorage.getItem("token");
      await api.post(
        "/inquiries/student",
        { subject, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubject("");
      setMessage("");
      dispatch(fetchInquiries()); // refresh the table
    } catch (err) {
      console.error("Failed to add inquiry:", err);
      alert("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <label>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ marginLeft: "10px", padding: "5px", width: "300px", height: "100px" }}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Submit Inquiry
      </button>
    </form>
  );
};

export default InquiryForm;
