// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext"; 

const ProtectedRoute = ({ admin = false, redirectTo = "/login" }) => {
  const { authToken, adminToken } = useContext(AuthContext);

  // admin panel routes
  if (admin) {
    if (!adminToken) {
      return <Navigate to="/admin/login" replace />;
    }
  } else {
    //  normal user routes
    if (!authToken) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  //  allow access
  return <Outlet />;
};

export default ProtectedRoute;
