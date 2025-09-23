import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("authToken");
  const adminToken = localStorage.getItem("adminToken");

  // Prefer admin token if present, else fallback to user token
  const token = adminToken || userToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
