import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const UserRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        role: "user", // role auto assign হবে
      });

      if (res.data.success) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(res.data.message || "Registration failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Server error while registration!");
    }
  };

  return (
    <form
      className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleRegister}
    >
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Your email
        </label>
        <input
          type="email"
          id="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Your password
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="repeat-password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Repeat password
        </label>
        <input
          type="password"
          id="repeat-password"
          placeholder="••••••••"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Register
      </button>
    </form>
  );
};

export default UserRegistration;
