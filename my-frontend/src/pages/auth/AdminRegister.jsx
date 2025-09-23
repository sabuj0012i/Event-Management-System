import { useState, useContext } from "react";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const { loginAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // always admin
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      // Save token and admin user
      loginAdmin(res.data.token, res.data.user);

      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(
        "Admin registration failed:",
        err.response?.data || err
      );
      alert(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Admin Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 text-white bg-blue-700 hover:bg-blue-800 rounded-lg font-medium focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Register Admin
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
