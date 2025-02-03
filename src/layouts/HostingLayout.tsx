import { Outlet } from "react-router-dom";
import Header from "../components/hosting/Header";

function HostingLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default HostingLayout;
