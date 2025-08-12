import AboutUs from "@/pages/AboutUs";
import ConfidenceBooking from "@/pages/ConfidenceBooking";
import ContactUs from "@/pages/ContactUs";
import ContentGuidelines from "@/pages/ContentGuidelines";
import GuestCancellationPolicy from "@/pages/GuestCancellationPolicy";
import GuestTerms from "@/pages/GuestTerms";
import HostCancellationPolicy from "@/pages/HostCancellationPolicy";
import HostTerms from "@/pages/HostTerms";
import ListingGuidelines from "@/pages/ListingGuidelines";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { Route } from "react-router-dom";

export const TermsRoutes = (
  <>
    <Route path="contact-us" element={<ContactUs />} />
    <Route path="about-us" element={<AboutUs />} />
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
  </>
);
