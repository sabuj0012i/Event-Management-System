// src/pages/user/Events.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import EventCard from "../../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/data/events.json") // public/data/events.json থেকে ডাটা আনবে
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Header Row with Create Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Events</h2>
        <Link
          to="/create-request"
          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 hover:scale-105 transition"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Event
        </Link>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <p className="text-gray-500">No events available right now.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
