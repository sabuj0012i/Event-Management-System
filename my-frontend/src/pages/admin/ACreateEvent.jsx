// Admin create event (direct create via backend)
import { useState } from "react";
import { CalendarDays, Clock, PlusCircle, Globe, MapPin, FileText, Link as LinkIcon } from "lucide-react";
import api from "../../utils/api";

const ACreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    mode: "online",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    details: "",
    venueOrLink: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      mode: formData.mode,
      meeting_link: formData.mode === "online" ? formData.venueOrLink : null,
      venue: formData.mode === "offline" ? formData.venueOrLink : null,
      start_time: `${formData.startDate} ${formData.startTime}`,
      end_time: `${formData.endDate} ${formData.endTime}`,
      details: formData.details,
    };

    try {
      const res = await api.post("/events", payload);
      setMessage({ type: 'success', text: 'Event created successfully.' });
      console.log("Created Event:", res.data);
      setFormData({
        name: "",
        mode: "online",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        details: "",
        venueOrLink: "",
      });
      // Optionally redirect to events list
      window.location.href = "/admin/events";
    } catch (err) {
      console.error("Error creating event:", err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create event.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Create Event</h2>
        <p className="text-gray-500 text-center mb-6">Fill in the details below to create a new event.</p>

        {message && (
          <div className={`mb-4 p-3 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.text}
          </div>
        )}

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

          {/* Event Mode */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Event Mode</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value="online"
                  checked={formData.mode === "online"}
                  onChange={handleChange}
                  className="text-blue-600 focus:ring-blue-400"
                />
                <Globe className="w-4 h-4 text-blue-500" />
                Online
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value="offline"
                  checked={formData.mode === "offline"}
                  onChange={handleChange}
                  className="text-blue-600 focus:ring-blue-400"
                />
                <MapPin className="w-4 h-4 text-red-500" />
                Offline
              </label>
            </div>
          </div>

          {/* Venue or Link */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">{formData.mode === "online" ? "Event Link" : "Event Venue"}</label>
            <div className="relative">
              {formData.mode === "online" ? (
                <LinkIcon className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              ) : (
                <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              )}
              <input
                type="text"
                name="venueOrLink"
                value={formData.venueOrLink}
                onChange={handleChange}
                placeholder={formData.mode === "online" ? "Enter event link" : "Enter event venue"}
                required
                className="w-full pl-10 border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>

          {/* Start Date & Time */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Start Date & Time</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <CalendarDays className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div className="relative flex-1">
                <Clock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>
          </div>

          {/* End Date & Time */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">End Date & Time</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <CalendarDays className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div className="relative flex-1">
                <Clock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Event Details</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Write a short description of your event..."
                rows="4"
                required
                className="w-full pl-10 border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
              ></textarea>
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
