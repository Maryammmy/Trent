import { Outlet } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";

const Layout = () => {
  useScrollToTop();

  return (
    <div className="[min-height:calc(100vh-73.6px)] sm:[min-height:calc(100vh-87px)]">
      <Outlet />
    </div>
  );
};

export default Layout;
