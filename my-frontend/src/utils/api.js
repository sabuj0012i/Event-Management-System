import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("authToken");
  const adminToken = localStorage.getItem("adminToken");

  const isAdminPage = typeof window !== 'undefined' && window.location && window.location.pathname.startsWith('/admin');
  const token = isAdminPage ? (adminToken || userToken) : (userToken || null);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
