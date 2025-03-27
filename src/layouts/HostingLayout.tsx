import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function HostingLayout() {
  return (
    <>
      <Navbar />
      <div className="mt-[73.6px] md:mt-[87px]">
        <Outlet />
      </div>
    </>
  );
}

export default HostingLayout;
