import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        alert(`Welcome back, ${res.data.user.email}`);
        navigate("/events"); 
      } else {
        alert(res.data.message || "Login failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Server error while login!");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <form className="space-y-6" onSubmit={handleLogin}>
        <h5 className="text-xl font-medium text-gray-900">Sign in</h5>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Your password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
