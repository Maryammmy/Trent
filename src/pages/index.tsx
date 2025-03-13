import Home from "./Home";
import Properties from "../components/landing/Properties";
import ChooseUs from "../components/landing/ChooseUs";
import MobileAppModal from "../components/landing/MobileAppModal";
import MobileAppBanner from "../components/landing/MobileAppBanner";

function LandingPage() {
  return (
    <>
      <Home />
      <Properties />
      <ChooseUs />
      <MobileAppBanner />
      <MobileAppModal />
    </>
  );
}

export default LandingPage;
