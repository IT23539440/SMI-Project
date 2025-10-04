// src/slices/examsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exams: [
    { id: 1, name: "Math Exam", date: "2025-10-10", teacher: "Bob Teacher" },
    { id: 2, name: "Science Exam", date: "2025-10-12", teacher: "Bob Teacher" },
  ],
};

export const examsSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    addExam: (state, action) => { state.exams.push(action.payload); },
    updateExam: (state, action) => {
      const index = state.exams.findIndex(e => e.id === action.payload.id);
      if (index >= 0) state.exams[index] = action.payload;
    },
    deleteExam: (state, action) => {
      state.exams = state.exams.filter(e => e.id !== action.payload);
    },
  },
});

export const { addExam, updateExam, deleteExam } = examsSlice.actions;
export default examsSlice.reducer;
