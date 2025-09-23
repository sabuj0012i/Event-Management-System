import { useEffect, useState } from "react";
import api from "../../utils/api";
import { CheckCircle, XCircle, Calendar } from "lucide-react";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/event-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Error loading requests:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setMessage({ type: "error", text: "Please login as admin to view pending requests." });
      } else {
        setMessage({ type: "error", text: err.response?.data?.message || "Failed to load pending requests." });
      }
    }
  };

  useEffect(() => {
    fetchRequests();
    const id = setInterval(fetchRequests, 15000);
    return () => clearInterval(id);
  }, []);

  const handleAction = async (id, action) => {
    try {
      if (action === "approved") {
        await api.post(`/event-requests/${id}/approve`);
        setMessage({ type: "success", text: "Request approved and event created." });
      } else if (action === "rejected") {
        await api.post(`/event-requests/${id}/reject`, { rejection_message: "Rejected by admin" });
        setMessage({ type: "success", text: "Request rejected." });
      }
      fetchRequests();
    } catch (err) {
      console.error(`Error ${action} request:`, err);
      setMessage({ type: "error", text: err.response?.data?.message || "Action failed." });
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 pb-2 sm:pb-3">
        Pending Event Requests
      </h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded-xl text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center italic">No pending requests.</p>
      ) : (
        <div className="space-y-5">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white border rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-md transition-all"
            >
              {/* Event Info */}
              <div className="flex items-start sm:items-center space-x-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{req.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(req.start_time).toLocaleDateString()} •{" "}
                    {new Date(req.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                    {new Date(req.end_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  {req.details && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{req.details}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
                <button
                  onClick={() => setSelected(req)}
                  className="flex-1 sm:flex-none flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm"
                >
                  See more
                </button>
                <button
                  onClick={() => handleAction(req.id, "approved")}
                  className="flex-1 sm:flex-none flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> Accept
                </button>
                <button
                  onClick={() => handleAction(req.id, "rejected")}
                  className="flex-1 sm:flex-none flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  <XCircle className="w-4 h-4 mr-1" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">{selected.name}</h3>
            <p className="text-sm text-gray-700 mb-3">{selected.details || "No details provided."}</p>
            <p className="text-sm text-gray-600">Mode: {selected.mode}</p>
            <p className="text-sm text-gray-600">Venue: {selected.venue || "-"}</p>
            <p className="text-sm text-gray-600">Meeting link: {selected.meeting_link || "-"}</p>
            <p className="text-sm text-gray-600">Start: {new Date(selected.start_time).toLocaleString()}</p>
            <p className="text-sm text-gray-600 mb-4">
              End: {new Date(selected.end_time).toLocaleString()}
            </p>
            <div className="text-right">
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
