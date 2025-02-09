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

export const RootRoutes = (
  <>
    <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
      <Route index element={<LandingPage />} />
      <Route path="properties" element={<LandingPage />} />
      <Route path="properties/:id" element={<Property />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="account-settings" element={<AccountSettings />}></Route>
      <Route path="account-settings/personal-info" element={<PersonalInfo />} />
      <Route
        path="account-settings/login-and-security"
        element={<LoginAndSecurity />}
      />
      <Route path="account-settings/preferences" element={<Preferences />} />
      <Route path="confirm-and-pay" element={<ConfirmAndPay />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    <Route path="properties/:id/gallery" element={<Gallery />} />
  </>
);
