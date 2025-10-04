// src/slices/usersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersStart: state => { state.loading = true; },
    fetchUsersSuccess: (state, action) => { state.loading = false; state.users = action.payload; },
    fetchUsersFailure: state => { state.loading = false; },
    addUser: (state, action) => { state.users.push(action.payload); },
    updateUser: (state, action) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) state.users[index] = action.payload;
    },
  },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, addUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
