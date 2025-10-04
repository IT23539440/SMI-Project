// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import inquiriesReducer from "./inquiriesSlice";
import paymentsReducer from "./paymentsSlice"; // if you have this

export const store = configureStore({
  reducer: {
    inquiries: inquiriesReducer,
    payments: paymentsReducer,
  },
});
