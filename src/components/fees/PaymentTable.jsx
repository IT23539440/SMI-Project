import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePayment } from "../../redux/paymentsSlice";
import PaymentForm from "./PaymentForm";

const PaymentTable = () => {
  const payments = useSelector(state => state.payments.payments);
  const dispatch = useDispatch();
  const userRole = localStorage.getItem("userRole") || "student";
  const isAdmin = userRole === "admin" || userRole === "owner";
  const isFinance = userRole === "finance";
  const canEdit = isAdmin || isFinance;

  const [editingPayment, setEditingPayment] = useState(null);

  return (
    <div>
      {editingPayment && <PaymentForm editingPayment={editingPayment} setEditingPayment={setEditingPayment} />}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Student</th>
            <th>Amount</th>
            <th>Status</th>
            {canEdit && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.student}</td>
              <td>{p.amount}</td>
              <td>{p.status}</td>
              {canEdit && (
                <td>
                  <button onClick={() => setEditingPayment(p)}>Edit</button>
                  <button onClick={() => dispatch(deletePayment(p.id))}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
