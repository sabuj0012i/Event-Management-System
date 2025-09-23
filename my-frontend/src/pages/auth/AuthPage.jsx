import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router";

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-t-lg font-semibold ${active ? 'bg-white text-blue-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
  >
    {children}
  </button>
);

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState(null); // {type, text}
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await api.post('/login', loginData);
      const { token, user } = res.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      setMessage({ type: 'success', text: `Welcome ${user.name}!` });
      navigate('/events');
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Login failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      await api.post('/register', {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });
      setMessage({ type: 'success', text: 'Registration successful! Please login.' });
      setActiveTab('login');
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Registration failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="flex gap-2">
        <TabButton active={activeTab === 'login'} onClick={() => setActiveTab('login')}>Login</TabButton>
        <TabButton active={activeTab === 'register'} onClick={() => setActiveTab('register')}>Register</TabButton>
      </div>
      <div className="bg-white shadow-md rounded-b-lg p-6 border-t-0 rounded-t-none">
        {message && (
          <div className={`mb-4 p-3 rounded text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              required
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50">
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
