// src/pages/admin/PendingRequests.jsx
import React from "react";
import { CheckCircle, XCircle, Calendar } from "lucide-react";

const mockRequests = [
  { id: 1, name: "Tech Expo", date: "2025-10-01", time: "10:00 AM" },
  { id: 2, name: "Startup Meet", date: "2025-10-05", time: "4:00 PM" },
];

const PendingRequests = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800  pb-3">
        Pending Event Requests
      </h2>

      {mockRequests.length === 0 ? (
        <p className="text-gray-500 text-center italic">No pending requests.</p>
      ) : (
        <div className="space-y-5">
          {mockRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white border rounded-2xl shadow-sm p-5 flex justify-between items-center hover:shadow-md transition-all"
            >
              {/* Left side - Event Info */}
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {req.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {req.date} • {req.time}
                  </p>
                </div>
              </div>

              {/* Right side - Actions */}
              <div className="flex space-x-3">
                <button className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition cursor-pointer">
                  <CheckCircle className="w-4 h-4" />
                  <span>Accept</span>
                </button>
                <button className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition cursor-pointer">
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
