import { Route } from "react-router-dom";
import RootLayout from "../layouts";
import ErrorHandler from "../components/errors/ErrorHandler";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import PersonalInfo from "../pages/accountSettings/PersonalInfo";
import LoginAndSecurity from "../pages/accountSettings/LoginAndSecurity";
import Preferences from "../pages/accountSettings/Preferences";
import NotFoundPage from "../pages/NotFoundPage";
import AccountSettings from "../pages/accountSettings";
import Property from "../pages/property";
import Gallery from "../pages/property/Gallery";
import ConfirmAndPay from "../pages/property/ConfirmAndPay";
import LandingPage from "../pages";
import ChatApp from "../pages/ChatApp";
import ProtectedRoutes from "../middleware/ProtectedRoutes";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ConfidenceBooking from "@/pages/ConfidenceBooking";
import ContentGuidelines from "@/pages/ContentGuidelines";
import ListingGuidelines from "@/pages/ListingGuidelines";
import GuestTerms from "@/pages/GuestTerms";
import HostTerms from "@/pages/HostTerms";
import GuestCancellationPolicy from "@/pages/GuestCancellationPolicy";
import HostCancellationPolicy from "@/pages/HostCancellationPolicy";

export const RootRoutes = (
  <>
    <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
      <Route index element={<LandingPage />} />
      <Route path="properties/:id" element={<Property />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route
        path="chat"
        element={
          <ProtectedRoutes>
            <ChatApp />
          </ProtectedRoutes>
        }
      />
      <Route
        path="account-settings"
        element={
          <ProtectedRoutes>
            <AccountSettings />
          </ProtectedRoutes>
        }
      />
      <Route
        path="account-settings/personal-info"
        element={
          <ProtectedRoutes>
            <PersonalInfo />
          </ProtectedRoutes>
        }
      />
      <Route
        path="account-settings/login-and-security"
        element={
          <ProtectedRoutes>
            <LoginAndSecurity />
          </ProtectedRoutes>
        }
      />
      <Route
        path="account-settings/preferences"
        element={
          <ProtectedRoutes>
            <Preferences />
          </ProtectedRoutes>
        }
      />
      <Route
        path="confirm-and-pay"
        element={
          <ProtectedRoutes>
            <ConfirmAndPay />
          </ProtectedRoutes>
        }
      />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="confidence-booking" element={<ConfidenceBooking />} />
      <Route path="content-guidelines" element={<ContentGuidelines />} />
      <Route path="listing-guidelines" element={<ListingGuidelines />} />
      <Route path="guest-terms" element={<GuestTerms />} />
      <Route
        path="guest-cancellation-policies"
        element={<GuestCancellationPolicy />}
      />
      <Route
        path="host-cancellation-policy"
        element={<HostCancellationPolicy />}
      />
      <Route path="host-terms" element={<HostTerms />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    <Route path="properties/:id/gallery" element={<Gallery />} />
  </>
);
