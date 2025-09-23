// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem("adminToken"));
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  // persist tokens in localStorage
  useEffect(() => {
    if (authToken) localStorage.setItem("authToken", authToken);
    else localStorage.removeItem("authToken");
  }, [authToken]);

  useEffect(() => {
    if (adminToken) localStorage.setItem("adminToken", adminToken);
    else localStorage.removeItem("adminToken");
  }, [adminToken]);

  // memoized login/logout functions
  const loginUser = useCallback((token, userData = null) => {
    setAuthToken(token);
    setUser(userData);
  }, []);

  const loginAdmin = useCallback((token, adminData = null) => {
    setAdminToken(token);
    setAdmin(adminData);
  }, []);

  const logoutUser = useCallback(() => {
    setAuthToken(null);
    setUser(null);
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminToken(null);
    setAdmin(null);
  }, []);

  // optimize re-renders with useMemo
  const value = useMemo(
    () => ({
      authToken,
      adminToken,
      user,
      admin,
      loginUser,
      loginAdmin,
      logoutUser,
      logoutAdmin,
    }),
    [authToken, adminToken, user, admin, loginUser, loginAdmin, logoutUser, logoutAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
