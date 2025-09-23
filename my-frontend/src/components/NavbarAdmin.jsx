import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Bell, LogOut } from "lucide-react";
import api from "../utils/api"; // axios instance

const NavbarAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Notifications load
  useEffect(() => {
    if (showNotifications) {
      setLoading(true);
      api
        .get("/notifications") // BASE_URL + /notifications
        .then((res) => {
          setNotifications(res.data || []);
        })
        .catch((err) => {
          console.error("Error loading notifications:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [showNotifications]);

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center relative">
      {/* Brand Name */}
      <h1 className="text-lg md:text-xl font-bold text-blue-700">
        Admin Panel
      </h1>

      {/* Links + Actions */}
      <div className="flex items-center space-x-6 font-semibold">
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
              location.pathname === "/admin/events" && new URLSearchParams(location.search).get('status') === 'upcoming'
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

        {/* Notification Icon */}
        <div className="relative">
          <button
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Dropdown Notifications (Modal style) */}
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

        {/* User Avatar */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="Admin"
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 hover:ring-2 hover:ring-blue-500 transition"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />

          {/* Profile Dropdown */}
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
    </nav>
  );
};

export default NavbarAdmin;
