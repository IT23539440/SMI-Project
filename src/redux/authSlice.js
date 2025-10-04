// src/redux/authSlice.js or wherever your login API is
import axios from "axios";

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post("/auth/login", credentials); 
    // if proxy: "http://localhost:5000/api" in package.json, keep this as "/auth/login"
    const data = res.data;
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token); // store JWT
    return data;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
};
