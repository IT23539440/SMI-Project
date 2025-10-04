// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles, userRole }) => {
  if (!allowedRoles.includes(userRole)) {
    // Redirect unauthorized users
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;

//allowedRoles: array of roles that can access the route

//userRole: the role of the current logged-in user

//Redirects unauthorized users to / or any public page