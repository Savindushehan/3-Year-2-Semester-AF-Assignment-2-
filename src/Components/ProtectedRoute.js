// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Components/SharedComponents/AuthContext"; // adjust path

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/NotFoundPage" />;
};

export default ProtectedRoute;
