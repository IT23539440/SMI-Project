// src/slices/paymentsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [
    { id: 1, student: "Charlie Student", amount: 500, status: "paid" },
    { id: 2, student: "Charlie Student", amount: 200, status: "pending" },
  ],
};

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    addPayment: (state, action) => { state.payments.push(action.payload); },
    updatePayment: (state, action) => {
      const index = state.payments.findIndex(p => p.id === action.payload.id);
      if (index >= 0) state.payments[index] = action.payload;
    },
    deletePayment: (state, action) => {
      state.payments = state.payments.filter(p => p.id !== action.payload);
    },
  },
});

export const { addPayment, updatePayment, deletePayment } = paymentsSlice.actions;
export default paymentsSlice.reducer;
