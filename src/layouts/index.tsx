import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";

const RootLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar />
      <div
        className={`min-h-[57vh] ${
          pathname === "/" ? "" : "mt-[73.6px] sm:mt-[87px]"
        }`}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
