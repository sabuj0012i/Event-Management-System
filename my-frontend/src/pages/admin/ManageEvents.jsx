// src/pages/admin/ManageEvents.jsx
import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/data/events.json") // public/data/events.json থেকে ডাটা ফেচ করবে
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} isAdmin />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
