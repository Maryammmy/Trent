import Home from "@/components/home/Home";
import ChooseUs from "../components/landing/ChooseUs";
import MobileAppModal from "../components/landing/MobileAppModal";
import MobileAppBanner from "../components/landing/MobileAppBanner";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";
import FAQ from "@/components/landing/faq/FAQ";
import { lazy, Suspense, useRef } from "react";
import PropertyCartSkeleton from "@/components/skeleton/PropertyCartSkeleton";
import InCompletedBookingModal from "@/components/landing/InCompletedBookingModal";
const Properties = lazy(() => import("../components/landing/Properties"));
function LandingPage() {
  const propertiesRef = useRef<HTMLDivElement | null>(null);
  const onSliderClick = () => {
    const offset = 80;
    if (propertiesRef.current) {
      const top =
        propertiesRef.current.getBoundingClientRect().top +
        window.scrollY -
        offset;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <Home onSliderClick={onSliderClick} />
      <Suspense fallback={<PropertyCartSkeleton cards={5} />}>
        <div ref={propertiesRef}>
          <Properties />
        </div>
      </Suspense>
      <ChooseUs />
      <FAQ />
      <MobileAppBanner />
      <InCompletedBookingModal />
      <MobileAppModal />
      <LoginModal />
      <SignupModal />
    </>
  );
}

export default LandingPage;
