import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import EventCard from "../../components/EventCard";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/events")
      .then((res) => setEvents(res.data))
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
