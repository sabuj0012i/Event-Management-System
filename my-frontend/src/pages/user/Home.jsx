// src/pages/user/Home.jsx
import { Link } from "react-router";

const Home = () => {
  const eventTypes = [
    { title: "Wedding" },
    { title: "Conference" },
    { title: "Workshop" },
    { title: "Concert" },
  ];

  return (
    <div className="py-10 px-4">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-8 max-w-6xl mx-auto">
        {/* Left Side - Description + Buttons */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to Event Management System 🎉
          </h1>
          <p className="text-gray-700 mb-4">
            Our Event Management System helps you organize and participate in
            events effortlessly. Whether you want to explore upcoming events or
            request to host your own, our platform makes it simple, fast, and
            user-friendly.
          </p>
          <p className="text-gray-600 mb-6">
            Manage everything from registrations, schedules, and event updates
            in one place. Join the community and never miss an event again!
          </p>

          {/* Buttons */}
          <div className="space-x-4">
            <Link
              to="/events"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              View Events
            </Link>
            <Link
              to="/create-request"
              className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              Create Request
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex flex-col items-center flex-1">
          <img
            src="/data/home.png"
            alt="Event Management"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Event Type Cards */}
      <div className="mt-16 max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
          Types of Events We Manage
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {eventTypes.map((event, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 text-gray-800 rounded-xl shadow-md p-6 flex items-center justify-center font-semibold text-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {event.title}
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="mt-8 text-gray-600 max-w-3xl mx-auto">
          From elegant weddings and corporate conferences to engaging workshops
          and vibrant concerts — we bring every event to life with flawless
          planning and execution. Our mission is to make your special moments
          unforgettable.
        </p>
      </div>
    </div>
  );
};

export default Home;
