import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Bell, LogOut, Menu } from "lucide-react";
import axios from "axios";

const NavbarUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const user =
    JSON.parse(localStorage.getItem("user")) || {
      name: "Guest",
      email: "guest@example.com",
    };

  const isActive = (path) => location.pathname === path;

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://127.0.0.1:8000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isNotificationOpen) {
      fetchNotifications();
    }
  }, [isNotificationOpen]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center relative">
        <h1 className="text-lg md:text-xl font-bold text-blue-700">
          Event Management System
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 font-semibold">
          <div className="space-x-4 text-xl md:text-base">
            <Link
              to="/events"
              className={`transition-colors ${
                location.pathname === "/events"
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              All Events
            </Link>
            <Link
              to="/events/upcoming"
              className={`transition-colors ${
                location.pathname === "/events/upcoming"
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Upcoming
            </Link>
            <Link
              to="/my-events"
              className={`transition-colors ${
                isActive("/my-events")
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              My Events
            </Link>
            <Link
              to="/create-request"
              className={`transition-colors ${
                isActive("/create-request")
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Create Request
            </Link>
          </div>

          {/* Notification */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Bell className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 z-50">
                <div className="px-4 py-3 bg-blue-100 rounded-t-xl text-blue-800 font-bold">
                  Notifications
                </div>
                {loading ? (
                  <p className="text-center py-4 text-gray-500">Loading...</p>
                ) : notifications.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    No notifications found
                  </p>
                ) : (
                  <ul className="divide-y divide-blue-100">
                    {notifications.map((n) => (
                      <li
                        key={n.id}
                        className={`px-4 py-3 hover:bg-blue-50 transition ${
                          !n.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="text-sm text-gray-800">{n.message}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(n.created_at).toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={profileRef}>
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 hover:ring-2 hover:ring-blue-500 transition"
              onClick={() => setIsModalOpen(!isModalOpen)}
            />
            {isModalOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50">
                <div className="px-3 py-2 text-gray-700">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-red-50 rounded-lg text-red-600 font-medium transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative bg-white w-72 max-w-full h-full shadow-xl p-6 flex flex-col">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>

            <div className="flex items-center space-x-3 mb-8">
              <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <nav className="flex flex-col space-y-4 font-medium">
              <Link
                to="/events"
                onClick={() => setSidebarOpen(false)}
                className={`${
                  isActive("/events")
                    ? "text-blue-600 font-bold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                All Events
              </Link>
              <Link
                to="/events/upcoming"
                onClick={() => setSidebarOpen(false)}
                className={`${
                  isActive("/events/upcoming")
                    ? "text-blue-600 font-bold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Upcoming
              </Link>
              <Link
                to="/my-events"
                onClick={() => setSidebarOpen(false)}
                className={`${
                  isActive("/my-events")
                    ? "text-blue-600 font-bold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                My Events
              </Link>
              <Link
                to="/create-request"
                onClick={() => setSidebarOpen(false)}
                className={`${
                  isActive("/create-request")
                    ? "text-blue-600 font-bold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Create Request
              </Link>
            </nav>

            <button
              onClick={handleLogout}
              className="mt-auto flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarUser;
