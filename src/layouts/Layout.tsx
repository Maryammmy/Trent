import { Outlet } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";

const Layout = () => {
  useScrollToTop();

  return <Outlet />;
};

export default Layout;
