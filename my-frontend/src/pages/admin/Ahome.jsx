import React from "react";
import { ClipboardList, PlusCircle, CalendarDays } from "lucide-react";

const Ahome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-10 py-10">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Text & Actions */}
        <div className="space-y-6 text-center md:text-left">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Welcome, Admin!
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Manage your platform with ease! Approve or reject event requests,
            create new events, and keep track of upcoming schedules — all from
            this dashboard. Use the quick actions below to get started.
          </p>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 hover:bg-blue-100 transition rounded-xl p-4 shadow-md flex flex-col items-center text-center">
              <ClipboardList className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-semibold text-gray-700 text-sm">Pending Requests</p>
            </div>

            <div className="bg-green-50 hover:bg-green-100 transition rounded-xl p-4 shadow-md flex flex-col items-center text-center">
              <PlusCircle className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-semibold text-gray-700 text-sm">Create Event</p>
            </div>

            <div className="bg-purple-50 hover:bg-purple-100 transition rounded-xl p-4 shadow-md flex flex-col items-center text-center">
              <CalendarDays className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-semibold text-gray-700 text-sm">Manage Events</p>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex justify-center">
          <img
            src="/data/Ahome.png"
            alt="Admin Dashboard"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Ahome;
