import { CalendarDays, Clock } from "lucide-react";

const EventCard = ({ event, onSeeMore }) => {
  const start = event.start_time ? new Date(event.start_time) : null;
  const end = event.end_time ? new Date(event.end_time) : null;
  const dateLabel = start ? start.toLocaleDateString() : (event.date || "");
  const timeLabel = start
    ? `${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end ? end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}`
    : (event.time || "");

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-md rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition transform duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h2>

      <div className="flex items-center space-x-4 text-gray-700 text-sm mb-3">
        <div className="flex items-center space-x-1">
          <CalendarDays className="w-4 h-4 text-blue-600" />
          <span>{dateLabel}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-purple-600" />
          <span>{timeLabel}</span>
        </div>
      </div>

      {event.details && (
        <p className="text-sm text-gray-700 line-clamp-2 mb-3">{event.details}</p>
      )}

      {onSeeMore && (
        <button
          onClick={() => onSeeMore(event)}
          className="mt-1 text-sm font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
        >
          See more
        </button>
      )}
    </div>
  );
};

export default EventCard;
