import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setToggle } from "../store/features/navbar/navbarSlice";

const RootLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setToggle(false));
  }, [pathname, dispatch]);
  return (
    <>
      <Navbar />
      <div className={` ${pathname === "/" ? "" : "mt-[73.6px] md:mt-[87px]"}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
