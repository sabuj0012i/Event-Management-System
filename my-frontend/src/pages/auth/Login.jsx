import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../utils/api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert(`Welcome ${user.name}!`);
      navigate("/events");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed. Try again!");
    } finally {
      setLoading(false);
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Login
      </h2>
      {error && <p className="text-red-600 text-center mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
