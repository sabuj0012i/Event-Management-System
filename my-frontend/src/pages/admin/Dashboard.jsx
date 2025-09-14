// src/pages/admin/Dashboard.jsx
const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded text-center">
          <h2 className="text-xl font-bold">Total Events</h2>
          <p className="text-2xl text-blue-600 mt-2">45</p>
        </div>
        <div className="bg-white p-6 shadow rounded text-center">
          <h2 className="text-xl font-bold">Pending Requests</h2>
          <p className="text-2xl text-yellow-600 mt-2">8</p>
        </div>
        <div className="bg-white p-6 shadow rounded text-center">
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-2xl text-green-600 mt-2">120</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
