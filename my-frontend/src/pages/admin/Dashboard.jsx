import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const Stat = ({ title, value }) => (
  <div className="bg-white p-6 shadow rounded text-center">
    <h2 className="text-sm font-medium text-gray-500">{title}</h2>
    <p className="text-2xl text-blue-600 mt-2 font-bold">{value}</p>
  </div>
);

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/analytics')
      .then(res => setSummary(res.data))
      .catch(err => console.error('Error loading analytics:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading analytics...</div>;
  if (!summary) return <div className="p-6">No analytics available.</div>;

  const participationLabels = summary.participation_labels || [];
  const participation = summary.participation || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Total Events" value={summary.total_events} />
        <Stat title="Upcoming" value={summary.upcoming_events} />
        <Stat title="Ongoing" value={summary.ongoing_events} />
        <Stat title="Finished" value={summary.finished_events} />
        <Stat title="Total Requests" value={summary.total_event_requests} />
        <Stat title="Pending Requests" value={summary.pending_requests} />
        <Stat title="Accepted" value={summary.accepted_requests} />
        <Stat title="Rejected" value={summary.rejected_requests} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Event Participation Trends</h3>
          <div style={{ height: 260 }}>
            <Line data={{
              labels: participationLabels,
              datasets: [
                { label: 'Registrations', data: participation, borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,0.2)' }
              ]
            }} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">User Registrations</h3>
          <div style={{ height: 260 }}>
            <Bar data={{
              labels: ['Total'],
              datasets: [ { label: 'Users', data: [summary.user_registrations || 0], backgroundColor: '#10b981' } ]
            }} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
