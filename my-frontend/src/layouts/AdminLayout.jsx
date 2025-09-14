import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const AdminLayout = () => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <NavbarAdmin />
    <main className="flex-1 p-6"><Outlet /></main>
    <Footer />
  </div>
);
export default AdminLayout;
