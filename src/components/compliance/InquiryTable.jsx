import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInquiries, updateInquiry, deleteInquiry } from "../../redux/inquiriesSlice";

const InquiryTable = ({ role }) => {
  const dispatch = useDispatch();
  const inquiries = useSelector((state) => state.inquiries.list || []);
  const loading = useSelector((state) => state.inquiries.loading);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ subject: "", message: "" });

  useEffect(() => {
    dispatch(fetchInquiries());
  }, [dispatch]);

  const handleEdit = (inquiry) => {
    setEditId(inquiry._id);
    setFormData({ subject: inquiry.subject, message: inquiry.message });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ subject: "", message: "" });
  };

  const handleUpdate = async (id) => {
    await dispatch(updateInquiry({ id, data: formData }));
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      await dispatch(deleteInquiry(id));
    }
  };

  if (loading) return <p>Loading inquiries...</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Subject</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Message</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Status</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {inquiries
          .filter((inq) =>
            role === "student"
              ? inq.studentEmail === JSON.parse(localStorage.getItem("user")).email
              : true
          )
          .map((inq) => (
            <tr key={inq._id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {editId === inq._id ? (
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                ) : (
                  inq.subject
                )}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {editId === inq._id ? (
                  <input
                    type="text"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                ) : (
                  inq.message
                )}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{inq.status || "pending"}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {editId === inq._id ? (
                  <>
                    <button onClick={() => handleUpdate(inq._id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(inq)}>Edit</button>
                    <button onClick={() => handleDelete(inq._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default InquiryTable;
