// src/api.js
import axios from 'axios';

// Base backend URL
const BASE_URL = 'http://localhost:5000/api';

// Function to get courses
export const getCourses = async (studentJWT) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${studentJWT}`, // send JWT
      },
    });
    return response.data; // array of courses
  } catch (err) {
    console.error("Error fetching courses:", err.response || err);
    throw err; // so your component can handle it
  }
};
