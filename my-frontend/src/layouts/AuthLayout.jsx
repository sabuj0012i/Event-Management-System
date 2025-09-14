import { Outlet } from "react-router";

const AuthLayout = () => (
  <div className="flex items-center justify-center min-h-screen bg-blue-50">
    <div className="w-full max-w-md bg-white shadow rounded-lg p-6">
      <Outlet />
    </div>
  </div>
);
export default AuthLayout;
