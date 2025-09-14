import { useState } from "react";

const RequestForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: "", date: "", time: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <input type="text" name="name" placeholder="Event Name" onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      <input type="date" name="date" onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      <input type="time" name="time" onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Create Request</button>
    </form>
  );
};
export default RequestForm;
