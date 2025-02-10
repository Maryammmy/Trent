import Home from "./Home";
import Properties from "../components/landing/Properties";
import ChooseUs from "../components/landing/ChooseUs";
import MobileAppModal from "../components/landing/MobileAppModal";

function LandingPage() {
  return (
    <>
      <Home />
      <Properties />
      <ChooseUs />
      <MobileAppModal />
    </>
  );
}

export default LandingPage;
