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
import TermsAndConditions from "@/pages/TermsAndConditions";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

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
      <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    <Route path="properties/:id/gallery" element={<Gallery />} />
  </>
);
