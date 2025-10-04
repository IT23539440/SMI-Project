import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPayment, updatePayment } from "../../redux/paymentsSlice";

const PaymentForm = ({ editingPayment, setEditingPayment }) => {
  const dispatch = useDispatch();

  // ✅ hooks must come first, always
  const [formData, setFormData] = useState({
    student: "",
    amount: "",
    status: "pending",
  });

  useEffect(() => {
    if (editingPayment) setFormData(editingPayment);
  }, [editingPayment]);

  // ✅ permission check AFTER hooks
  const userRole = localStorage.getItem("userRole") || "student";
  const isAdmin = userRole === "admin" || userRole === "owner";
  const isFinance = userRole === "finance";
  if (!isAdmin && !isFinance) {
    return <p>You do not have permission to manage payments.</p>;
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPayment) {
      dispatch(updatePayment(formData));
      setEditingPayment(null);
    } else {
      dispatch(addPayment({ ...formData, id: Date.now() }));
    }
    setFormData({ student: "", amount: "", status: "pending" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="student"
        placeholder="Student Name"
        value={formData.student}
        onChange={handleChange}
        required
      />
      <input
        name="amount"
        placeholder="Amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
      </select>
      <button type="submit">
        {editingPayment ? "Update Payment" : "Add Payment"}
      </button>
      {editingPayment && (
        <button type="button" onClick={() => setEditingPayment(null)}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default PaymentForm;
