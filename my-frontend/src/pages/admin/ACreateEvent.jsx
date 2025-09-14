// src/pages/user/CreateRequest.jsx
import { useState } from "react";
import { CalendarDays, Clock, PlusCircle } from "lucide-react";

const ACreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Request Submitted:", formData);
    alert("Your event request has been submitted!");
    setFormData({ name: "", date: "", time: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Create Event Request
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Fill in the details below to submit your event request.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter event name"
              required
              className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Date
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full pl-10 border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>

          {/* Event Time */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full pl-10 border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 hover:scale-[1.02] active:scale-95 shadow-lg transition"
          >
            <PlusCircle className="w-5 h-5" />
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default ACreateEvent;
