import EventCard from "./EventCard";

const EventList = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((ev, i) => (
        <EventCard key={i} event={ev} />
      ))}
    </div>
  );
};
export default EventList;
