import { useEffect, useState } from "react";
import api from "../../utils/api"
import EventCard from "../../components/EventCard";
import { trackEvent } from "../../utils/analytics";
import { useMemo } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const url = status ? `/events?status=${status}` : '/events';
    api
      .get(url)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error loading events:", err));
  }, [window.location.search]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Events</h2>
      {events.length === 0 ? (
        <p className="text-gray-500">No events available right now.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onSeeMore={(e)=>{ setSelected(e); trackEvent('event_view', { event_id: event.id }); }} />
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6" onClick={(e)=>e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-2">{selected.name}</h3>
            <p className="text-sm text-gray-700 mb-3">{selected.details || "No details provided."}</p>
            <p className="text-sm text-gray-600">Start: {selected.start_time ? new Date(selected.start_time).toLocaleString() : "-"}</p>
            <p className="text-sm text-gray-600 mb-4">End: {selected.end_time ? new Date(selected.end_time).toLocaleString() : "-"}</p>
            <div className="text-right">
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white" onClick={()=>setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
