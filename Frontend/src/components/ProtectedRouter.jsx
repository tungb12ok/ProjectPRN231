import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedComponent = ({ roles, children }) => {
  const token = localStorage.getItem("token");
  console.log("token::::"+token);
  if (!token) {
    return <Navigate to="/login" />;
  }

  const { role } = jwtDecode(token);
  if (!roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedComponent;
