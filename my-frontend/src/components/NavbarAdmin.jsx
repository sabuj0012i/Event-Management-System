import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Bell, LogOut, Menu } from "lucide-react";
import api from "../utils/api";

const NavbarAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Load notifications on mount & poll every 15s
  useEffect(() => {
    const load = () => {
      setLoading(true);
      api
        .get("/notifications")
        .then((res) => setNotifications(res.data || []))
        .catch((err) => console.error("Error loading notifications:", err))
        .finally(() => setLoading(false));
    };
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center relative">
        {/* Brand Name */}
        <h1 className="text-lg md:text-xl font-bold text-blue-700">
          Admin Panel
        </h1>

        {/* Desktop Links + Actions */}
        <div className="hidden md:flex items-center space-x-6 font-semibold">
          {/* Links */}
          <div className="space-x-4 text-xl md:text-base">
            <Link
              to="/admin/events"
              className={`transition-colors ${
                isActive("/admin/events")
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              All Events
            </Link>
            <Link
              to="/admin/analytics"
              className={`transition-colors ${
                isActive("/admin/analytics")
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Analytics
            </Link>
            <Link
              to="/admin/pending-requests"
              className={`transition-colors ${
                isActive("/admin/pending-requests")
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Pending Requests
            </Link>
            <Link
              to="/admin/events?status=upcoming"
              className={`transition-colors ${
                location.pathname === "/admin/events" &&
                new URLSearchParams(location.search).get("status") === "upcoming"
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Upcoming
            </Link>
            <Link
              to="/admin/create-event"
              className={`transition-colors ${
                isActive("/admin/create-event")
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Create Event
            </Link>
          </div>

          {/* Notification */}
          <div className="relative">
            <button
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto divide-y divide-gray-200">
                {loading ? (
                  <p className="p-4 text-gray-500 text-sm">Loading...</p>
                ) : notifications.length === 0 ? (
                  <p className="p-4 text-gray-500 text-sm">
                    No notifications available
                  </p>
                ) : (
                  notifications.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 hover:bg-gray-50 transition cursor-pointer"
                    >
                      <p className="text-sm text-gray-800">{item.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <img
              src="https://i.pravatar.cc/40?img=12"
              alt="Admin"
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 hover:ring-2 hover:ring-blue-500 transition"
              onClick={() => setIsModalOpen(!isModalOpen)}
            />

            {isModalOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50">
                <div className="px-3 py-2 text-gray-700">
                  <p className="font-semibold">Admin User</p>
                  <p className="text-sm text-gray-500">admin@email.com</p>
                </div>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("user");
                    window.location.href = "/admin/login";
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-100 rounded-lg text-red-600 font-medium transition"
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

            <h2 className="text-xl font-bold text-blue-700 mb-6">
              Admin Menu
            </h2>

            <nav className="flex flex-col space-y-4 font-medium">
              <Link
                to="/admin/events"
                onClick={() => setSidebarOpen(false)}
                className={`${isActive("/admin/events") ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}`}
              >
                All Events
              </Link>
              <Link
                to="/admin/analytics"
                onClick={() => setSidebarOpen(false)}
                className={`${isActive("/admin/analytics") ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}`}
              >
                Analytics
              </Link>
              <Link
                to="/admin/pending-requests"
                onClick={() => setSidebarOpen(false)}
                className={`${isActive("/admin/pending-requests") ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}`}
              >
                Pending Requests
              </Link>
              <Link
                to="/admin/events?status=upcoming"
                onClick={() => setSidebarOpen(false)}
                className={`${location.pathname === "/admin/events" && new URLSearchParams(location.search).get("status") === "upcoming"
                    ? "text-blue-600 font-bold"
                    : "text-gray-700 hover:text-blue-600"}`}
              >
                Upcoming
              </Link>
              <Link
                to="/admin/create-event"
                onClick={() => setSidebarOpen(false)}
                className={`${isActive("/admin/create-event") ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}`}
              >
                Create Event
              </Link>
            </nav>

            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("user");
                window.location.href = "/admin/login";
              }}
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

export default NavbarAdmin;
