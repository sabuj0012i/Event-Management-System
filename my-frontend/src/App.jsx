import { BrowserRouter, Routes, Route } from "react-router"; 
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

// User pages
import Home from "./pages/user/Home";
import Events from "./pages/user/Events";
import MyEvents from "./pages/user/MyEvents";
import CreateRequest from "./pages/user/CreateRequest";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import PendingRequests from "./pages/admin/PendingRequests";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AEvents from "./pages/admin/AEvents";
import ACreateEvent from "./pages/admin/ACreateEvent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ User Layout */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/create-request" element={<CreateRequest />} />
        </Route>

        {/* ✅ Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<AEvents />} />
          <Route path="create-event" element={<ACreateEvent />} />
          <Route path="pending-requests" element={<PendingRequests />} />
        </Route>

        {/* ✅ Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
