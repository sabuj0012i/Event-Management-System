import { useEffect, useState } from "react";
import api from "../../utils/api";
import { CheckCircle, XCircle, Calendar, Clock } from "lucide-react";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/event-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Error loading requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      if (action === "approved") {
        await api.post(`/event-requests/${id}/approve`);
      } else if (action === "rejected") {
        await api.post(`/event-requests/${id}/reject`, { rejection_message: "Rejected by admin" });
      }
      fetchRequests(); // refresh list
    } catch (err) {
      console.error(`Error ${action} request:`, err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 pb-3">
        Pending Event Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center italic">No pending requests.</p>
      ) : (
        <div className="space-y-5">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white border rounded-2xl shadow-sm p-5 flex justify-between items-center hover:shadow-md transition-all"
            >
              {/* Event Info */}
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {req.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(req.start_time).toLocaleDateString()} • {new Date(req.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(req.end_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  {req.details && <p className="text-xs text-gray-600 line-clamp-1 mt-1">{req.details}</p>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelected(req)}
                  className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                >
                  <span>See more</span>
                </button>
                <button
                  onClick={() => handleAction(req.id, "approved")}
                  className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Accept</span>
                </button>
                <button
                  onClick={() => handleAction(req.id, "rejected")}
                  className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6" onClick={(e)=>e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-2">{selected.name}</h3>
            <p className="text-sm text-gray-700 mb-3">{selected.details || "No details provided."}</p>
            <p className="text-sm text-gray-600">Mode: {selected.mode}</p>
            <p className="text-sm text-gray-600">Venue: {selected.venue || '-'}</p>
            <p className="text-sm text-gray-600">Meeting link: {selected.meeting_link || '-'}</p>
            <p className="text-sm text-gray-600">Start: {new Date(selected.start_time).toLocaleString()}</p>
            <p className="text-sm text-gray-600 mb-4">End: {new Date(selected.end_time).toLocaleString()}</p>
            <div className="text-right">
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white" onClick={()=>setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
