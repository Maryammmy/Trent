import Home from "./Home";
import Properties from "../components/landing/Properties";
import ChooseUs from "../components/landing/ChooseUs";
import MobileAppModal from "../components/landing/MobileAppModal";
import MobileAppBanner from "../components/landing/MobileAppBanner";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";

function LandingPage() {
  return (
    <>
      <Home />
      <Properties />
      <ChooseUs />
      <MobileAppBanner />
      <MobileAppModal />
      <LoginModal />
      <SignupModal />
    </>
  );
}

export default LandingPage;
