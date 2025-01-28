import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/components/Navbar";
import Sidebar from "../components/dashboard/components/Sidebar";

function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
}

export default DashboardLayout;
