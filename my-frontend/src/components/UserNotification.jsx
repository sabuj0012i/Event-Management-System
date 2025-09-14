import React from "react";
import { Bell, CalendarDays } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    title: "Your event request has been approved ✅",
    description: "Tech Conference is now scheduled.",
    time: "2h ago",
  },
  {
    id: 2,
    title: "New event added 🎉",
    description: "Music Fest has been published for registration.",
    time: "1 day ago",
  },
  {
    id: 3,
    title: "Your request is pending ⏳",
    description: "Book Fair approval is still in progress.",
    time: "3 days ago",
  },
];

const UserNotification = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {mockNotifications.length > 0 ? (
          mockNotifications.map((notif) => (
            <div
              key={notif.id}
              className="bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-900 font-semibold">{notif.title}</p>
                  <p className="text-sm text-gray-600">{notif.description}</p>
                </div>
                <CalendarDays className="w-4 h-4 text-gray-400 mt-1" />
              </div>
              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">
            No notifications right now.
          </p>
        )}
      </div>

      {/* Clear All Button */}
      {mockNotifications.length > 0 && (
        <button className="w-full mt-3 bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition">
          Mark all as read
        </button>
      )}
    </div>
  );
};

export default UserNotification;
