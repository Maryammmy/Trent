import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/components/Navbar";
import Sidebar from "../components/dashboard/components/Sidebar";
import { useAppSelector } from "../store/hooks";

function DashboardLayout() {
  const { darkMode } = useAppSelector((state) => state.darkMode);
  return (
    <div  className={darkMode ? "dark" : "light"}>
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
