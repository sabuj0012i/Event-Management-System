// src/pages/user/MyEvents.jsx
import { CalendarDays, Clock, CheckCircle, XCircle, Hourglass } from "lucide-react";

const mockMyEvents = [
  { name: "Tech Conference", date: "2025-09-20", time: "10:00 AM", status: "Pending" },
  { name: "Music Fest", date: "2025-09-25", time: "6:00 PM", status: "Accepted" },
  { name: "Book Fair", date: "2025-09-30", time: "11:00 AM", status: "Rejected" },
];

const getStatusStyles = (status) => {
  switch (status) {
    case "Accepted":
      return {
        classes: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-4 h-4" />,
      };
    case "Pending":
      return {
        classes: "bg-yellow-100 text-yellow-800",
        icon: <Hourglass className="w-4 h-4" />,
      };
    case "Rejected":
      return {
        classes: "bg-red-100 text-red-800",
        icon: <XCircle className="w-4 h-4" />,
      };
    default:
      return {
        classes: "bg-gray-100 text-gray-700",
        icon: null,
      };
  }
};

const getCardGradient = (status) => {
  switch (status) {
    case "Accepted":
      return "bg-gradient-to-r from-green-50 to-green-100";
    case "Pending":
      return "bg-gradient-to-r from-yellow-50 to-yellow-100";
    case "Rejected":
      return "bg-gradient-to-r from-red-50 to-red-100";
    default:
      return "bg-gradient-to-r from-gray-50 to-gray-100";
  }
};

const MyEvents = () => {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Page Heading */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Event Requests
      </h2>

      {/* Event Cards */}
      {mockMyEvents.length === 0 ? (
        <p className="text-gray-500">
          You have not created any event requests yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMyEvents.map((event, index) => {
            const statusInfo = getStatusStyles(event.status);
            return (
              <div
                key={index}
                className={`${getCardGradient(
                  event.status
                )} rounded-2xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition transform duration-300`}
              >
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {event.name}
                </h3>

                {/* Date & Time */}
                <div className="flex items-center space-x-4 text-sm text-gray-700 mb-3">
                  <div className="flex items-center space-x-1">
                    <CalendarDays className="w-4 h-4 text-blue-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{event.time}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${statusInfo.classes}`}
                >
                  {statusInfo.icon}
                  {event.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
