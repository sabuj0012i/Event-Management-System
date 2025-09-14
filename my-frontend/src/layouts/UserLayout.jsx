import NavbarUser from "../components/NavbarUser";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const UserLayout = () => (
  <div className="flex flex-col min-h-screen">
    <NavbarUser />
    <main className="flex-1 p-6"><Outlet /></main>
    <Footer />
  </div>
);
export default UserLayout;
