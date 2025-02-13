import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      <div className={` ${pathname === "/" ? "" : "mt-[87px]"}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
