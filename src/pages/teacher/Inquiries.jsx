import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import InquiryForm from "../../components/compliance/InquiryForm";
import InquiryTable from "../../components/compliance/InquiryTable";


export default function Inquiries({ user }) {
  const [inquiries, setInquiries] = useState([]);

  const fetchInquiries = async () => {
    try {
      const endpoint = user.role === "student"
        ? `/inquiries/student/${user._id}`
        : "/inquiries";
      const { data } = await apiClient.get(endpoint);
      setInquiries(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, response) => {
    try {
      await apiClient.put(`/inquiries/${id}`, { response, status: "Resolved", assignedTo: user._id });
      fetchInquiries();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div>
      {user.role === "student" && <InquiryForm studentId={user._id} onSuccess={fetchInquiries} />}
      <InquiryTable inquiries={inquiries} onUpdate={handleUpdate} />
    </div>
  );
}
