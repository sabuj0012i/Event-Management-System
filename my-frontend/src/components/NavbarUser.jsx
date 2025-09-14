import React, { useState } from "react";
import { Link, useLocation } from "react-router"; 
import { Bell, LogOut } from "lucide-react";
import UserNotification from "../components/UserNotification";

const NavbarUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center relative">
      {/* Brand Name */}
      <h1 className="text-lg md:text-xl font-bold text-blue-700">
        Event Management System
      </h1>

      {/* Links + Actions */}
      <div className="flex items-center space-x-6 font-semibold">
        {/* Links */}
        <div className="space-x-4 text-xl md:text-base">
          <Link
            to="/events"
            className={`transition-colors ${
              isActive("/events")
                ? "text-blue-600 font-bold border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            All Events
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

        {/* Notification Icon */}
        <div className="relative">
          <button
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          {/* Dropdown Notifications */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80">
              <UserNotification />
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 hover:ring-2 hover:ring-blue-500 transition"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />

          {/* Profile Dropdown */}
          {isModalOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50">
              <div className="px-3 py-2 text-gray-700">
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-gray-500">johndoe@email.com</p>
              </div>
              <hr className="my-2" />
              <button
                onClick={() => alert("Logging out...")}
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

export default NavbarUser;
