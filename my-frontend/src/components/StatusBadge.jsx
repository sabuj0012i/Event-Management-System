const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-200 text-yellow-800",
    Accepted: "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800",
  };

  return <span className={`px-3 py-1 rounded-full text-sm ${colors[status]}`}>{status}</span>;
};
export default StatusBadge;
