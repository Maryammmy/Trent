import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";
import LoginModal from "../components/auth/LoginModal";
import SignupModal from "../components/auth/SignupModal";
import ForgetPasswordModal from "../components/auth/ForgetPasswordModal";

const RootLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      <div className={` ${pathname === "/" ? "" : "mt-[87px]"}`}>
        <Outlet />
      </div>
      <Footer />
      <LoginModal />
      <SignupModal />
      <ForgetPasswordModal />
    </>
  );
};

export default RootLayout;
