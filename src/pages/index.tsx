import Home from "@/components/home/Home";
import Properties from "../components/landing/Properties";
import ChooseUs from "../components/landing/ChooseUs";
import MobileAppModal from "../components/landing/MobileAppModal";
import MobileAppBanner from "../components/landing/MobileAppBanner";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";
import FAQ from "@/components/landing/faq/FAQ";

function LandingPage() {
  return (
    <>
      <Home />
      <Properties />
      <ChooseUs />
      <FAQ />
      <MobileAppBanner />
      <MobileAppModal />
      <LoginModal />
      <SignupModal />
    </>
  );
}

export default LandingPage;
