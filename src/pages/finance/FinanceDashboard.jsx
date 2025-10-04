// src/pages/finance/FinanceDashboard.jsx
import React from "react";
import PaymentForm from "../../components/fees/PaymentForm";
import PaymentTable from "../../components/fees/PaymentTable";
import InquiryForm from "../../components/compliance/InquiryForm";
import InquiryTable from "../../components/compliance/InquiryTable";

const FinanceDashboard = () => {
  return (
    <div>
      <h2>Finance Dashboard</h2>

      <section>
        <h3>Payments</h3>
        <PaymentForm />
        <PaymentTable />
      </section>

      <section>
        <h3>Compliance</h3>
        <InquiryForm />
        <InquiryTable />
      </section>
    </div>
  );
};

export default FinanceDashboard;
