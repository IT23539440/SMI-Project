import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
  students: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Teacher actions
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
    updateTeacher: (state, action) => {
      const idx = state.teachers.findIndex(t => t.id === action.payload.id);
      if (idx >= 0) state.teachers[idx] = action.payload;
    },
    deleteTeacher: (state, action) => {
      state.teachers = state.teachers.filter(t => t.id !== action.payload);
    },

    // Student actions
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const idx = state.students.findIndex(s => s.id === action.payload.id);
      if (idx >= 0) state.students[idx] = action.payload;
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(s => s.id !== action.payload);
    },
  },
});

export const {
  addTeacher, updateTeacher, deleteTeacher,
  addStudent, updateStudent, deleteStudent,
} = usersSlice.actions;

export default usersSlice.reducer;
