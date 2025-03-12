import Home from "./Home";
import Properties from "../components/landing/Properties";
import ChooseUs from "../components/landing/ChooseUs";
import MobileAppModal from "../components/landing/MobileAppModal";
import MobileAppBanner from "../components/landing/MobileAppBanner";
// import Map from "../components/Map";

function LandingPage() {
  return (
    <>
      <Home />
      <Properties />
      {/* <Map /> */}
      <ChooseUs />
      <MobileAppBanner />
      <MobileAppModal />
    </>
  );
}

export default LandingPage;
