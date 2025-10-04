import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to University Exam System</h1>
      <button
        onClick={() => navigate("/signup")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Sign Up
      </button>
      <button
        onClick={() => navigate("/login")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Sign In
      </button>
    </div>
  );
};

export default Home;
