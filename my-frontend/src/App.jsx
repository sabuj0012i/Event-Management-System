import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// User pages
import Home from "./pages/user/Home";
import Events from "./pages/user/Events";
import MyEvents from "./pages/user/MyEvents";
import CreateRequest from "./pages/user/CreateRequest";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import AEvents from "./pages/admin/AEvents";
import ACreateEvent from "./pages/admin/ACreateEvent";
import PendingRequests from "./pages/admin/PendingRequests";

// Auth pages
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminRegister from "./pages/auth/AdminRegister";
import Register from "./pages/auth/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/create-request" element={<CreateRequest />} />
          </Route>
        </Route>

        
        <Route element={<ProtectedRoute admin />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="events" element={<AEvents />} />
            <Route path="create-event" element={<ACreateEvent />} />
            <Route path="pending-requests" element={<PendingRequests />} />
          </Route>
        </Route>

  
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

  
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
