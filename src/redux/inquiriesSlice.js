// src/redux/inquiriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get JWT from localStorage
const getToken = () => JSON.parse(localStorage.getItem("token"));

// Fetch all inquiries for the logged-in student
export const fetchInquiries = createAsyncThunk(
  "inquiries/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.get("/inquiries/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Add a new inquiry
export const addInquiry = createAsyncThunk(
  "inquiries/add",
  async (inquiryData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.post("/inquiries/student", inquiryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Update an inquiry (if you implement update on backend)
export const updateInquiry = createAsyncThunk(
  "inquiries/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.put(`/inquiries/student/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Delete an inquiry
export const deleteInquiry = createAsyncThunk(
  "inquiries/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.delete(`/inquiries/student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; // return deleted ID
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const inquiriesSlice = createSlice({
  name: "inquiries",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchInquiries
      .addCase(fetchInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch inquiries";
      })
      // addInquiry
      .addCase(addInquiry.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // updateInquiry
      .addCase(updateInquiry.fulfilled, (state, action) => {
        const index = state.list.findIndex((inq) => inq._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      // deleteInquiry
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.list = state.list.filter((inq) => inq._id !== action.payload);
      });
  },
});

export default inquiriesSlice.reducer;
