import { useEffect, useState } from "react";
import { CalendarDays, Clock, CheckCircle, XCircle, Hourglass } from "lucide-react";
import api from "../../utils/api";

const getStatusStyles = (status) => {
  switch (status) {
    case "accepted":
      return { classes: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4" /> };
    case "pending":
      return { classes: "bg-yellow-100 text-yellow-800", icon: <Hourglass className="w-4 h-4" /> };
    case "rejected":
      return { classes: "bg-red-100 text-red-800", icon: <XCircle className="w-4 h-4" /> };
    default:
      return { classes: "bg-gray-100 text-gray-700", icon: null };
  }
};

const getCardGradient = (status) => {
  switch (status) {
    case "accepted":
      return "bg-gradient-to-r from-green-50 to-green-100";
    case "pending":
      return "bg-gradient-to-r from-yellow-50 to-yellow-100";
    case "rejected":
      return "bg-gradient-to-r from-red-50 to-red-100";
    default:
      return "bg-gradient-to-r from-gray-50 to-gray-100";
  }
};

const MyEvents = () => {
  const [data, setData] = useState({ created_events: [], event_requests: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await api.get("/my-events");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching my events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyEvents();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Event Requests</h2>

      {loading ? (
        <p className="text-gray-500">Loading your events...</p>
      ) : data.event_requests.length === 0 && data.created_events.length === 0 ? (
        <p className="text-gray-500">You have not created any event requests yet.</p>
      ) : (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">My Requests</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.event_requests.map((event) => {
                const statusInfo = getStatusStyles(event.status);
                return (
                  <div
                    key={`req-${event.id}`}
                    className={`${getCardGradient(event.status)} rounded-2xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition transform duration-300`}
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{event.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-700 mb-3">
                      <div className="flex items-center space-x-1">
                        <CalendarDays className="w-4 h-4 text-blue-600" />
                        <span>{new Date(event.start_time).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span>{new Date(event.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${statusInfo.classes}`}>
                      {statusInfo.icon}
                      {event.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Events I Created</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.created_events.map((event) => {
            const statusInfo = getStatusStyles(event.status);
            return (
              <div
                key={`ev-${event.id}`}
                className={`${getCardGradient(event.status)} rounded-2xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition transform duration-300`}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">{event.name}</h3>

                <div className="flex items-center space-x-4 text-sm text-gray-700 mb-3">
                  <div className="flex items-center space-x-1">
                    <CalendarDays className="w-4 h-4 text-blue-600" />
                    <span>{new Date(event.start_time).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{new Date(event.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>

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
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
