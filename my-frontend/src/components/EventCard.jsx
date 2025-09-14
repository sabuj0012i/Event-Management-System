import { CalendarDays, Clock } from "lucide-react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-md rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition transform duration-300">
      {/* Event Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h2>

      {/* Date & Time */}
      <div className="flex items-center space-x-4 text-gray-700 text-sm">
        <div className="flex items-center space-x-1">
          <CalendarDays className="w-4 h-4 text-blue-600" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-purple-600" />
          <span>{event.time}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
