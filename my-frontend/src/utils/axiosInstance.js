// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("authToken");
    const adminToken = localStorage.getItem("adminToken");

    // যদি admin endpoint হয় তাহলে admin token ব্যবহার করব
    if (config.url?.startsWith("/event-requests") || config.url?.startsWith("/events")) {
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    } else {
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
