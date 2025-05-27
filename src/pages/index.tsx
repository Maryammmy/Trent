import Home from "@/components/home/Home";
// import Properties from "../components/landing/Properties";
import ChooseUs from "../components/landing/ChooseUs";
import MobileAppModal from "../components/landing/MobileAppModal";
import MobileAppBanner from "../components/landing/MobileAppBanner";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";
import FAQ from "@/components/landing/faq/FAQ";
import { lazy, Suspense } from "react";
import PropertyCartSkeleton from "@/components/skeleton/PropertyCartSkeleton";
const Properties = lazy(() => import("../components/landing/Properties"));
function LandingPage() {
  return (
    <>
      <Home />
      <Suspense fallback={<PropertyCartSkeleton cards={5} />}>
        <Properties />
      </Suspense>
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
