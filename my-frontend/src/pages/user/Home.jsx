// src/pages/user/Home.jsx
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Welcome to Event Management System 🎉
      </h1>
      <p className="text-gray-600 mb-6">
        Discover upcoming events or create your own event requests.
      </p>
      <div className="space-x-4">
        <Link
          to="/events"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          View Events
        </Link>
        <Link
          to="/create-request"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Create Request
        </Link>
      </div>
    </div>
  );
};

export default Home;
