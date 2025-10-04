// src/slices/subjectsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [
    { id: 1, name: "Math", teacher: "Bob Teacher" },
    { id: 2, name: "Science", teacher: "Bob Teacher" },
  ],
};

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    addSubject: (state, action) => { state.subjects.push(action.payload); },
    updateSubject: (state, action) => {
      const index = state.subjects.findIndex(s => s.id === action.payload.id);
      if (index >= 0) state.subjects[index] = action.payload;
    },
    deleteSubject: (state, action) => {
      state.subjects = state.subjects.filter(s => s.id !== action.payload);
    },
  },
});

export const { addSubject, updateSubject, deleteSubject } = subjectsSlice.actions;
export default subjectsSlice.reducer;
