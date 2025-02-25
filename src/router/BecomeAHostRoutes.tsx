import { Route } from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import GetStartedToHost from "../pages/becomeAHost";
import AboutYourPlace from "../pages/becomeAHost/aboutYourPlace";
import PropertyType from "../pages/becomeAHost/aboutYourPlace/PropertyType";
import LocationOfPlace from "../pages/becomeAHost/aboutYourPlace/LocationOfPlace";
import FloorPlan from "../pages/becomeAHost/aboutYourPlace/FloorPlan";
import StandOut from "../pages/becomeAHost/standOut";
import FinishSetup from "../pages/becomeAHost/finishSetup";
import InstantBook from "../pages/becomeAHost/finishSetup/InstantBook";
import Visibility from "../pages/becomeAHost/finishSetup/Visibility";
import Price from "../pages/becomeAHost/finishSetup/Price";
import Discount from "../pages/becomeAHost/finishSetup/Discount";
import LegalAndCreate from "../pages/becomeAHost/finishSetup/LegalAndCreate";
import BecomeAHostLayout from "../layouts/BecomeAHost";
import RedirectRoute from "../middleware/RedirectRoute";
import Facilities from "../pages/becomeAHost/standOut/Facilities";
import Images from "../pages/becomeAHost/standOut/Images";
import Description from "../pages/becomeAHost/standOut/Description";
import Title from "../pages/becomeAHost/standOut/Title";
export const BecomeAHostRoutes = (
  <Route
    path="/become-a-host"
    element={<BecomeAHostLayout />}
    errorElement={<ErrorHandler />}
  >
    <Route index element={<GetStartedToHost />} />
    <Route path="about-your-place" element={<AboutYourPlace />} />
    <Route
      path="property-type"
      element={
        <RedirectRoute>
          <PropertyType />
        </RedirectRoute>
      }
    />
    <Route
      path="floor-plan"
      element={
        <RedirectRoute>
          <FloorPlan />
        </RedirectRoute>
      }
    />
    <Route
      path="location"
      element={
        <RedirectRoute>
          <LocationOfPlace />
        </RedirectRoute>
      }
    />
    <Route path="stand-out" element={<StandOut />} />
    <Route
      path="facilities"
      element={
        <RedirectRoute>
          <Facilities />
        </RedirectRoute>
      }
    />
    <Route
      path="images"
      element={
        <RedirectRoute>
          <Images />
        </RedirectRoute>
      }
    />
    <Route
      path="title"
      element={
        <RedirectRoute>
          <Title />
        </RedirectRoute>
      }
    />
    <Route
      path="description"
      element={
        <RedirectRoute>
          <Description />
        </RedirectRoute>
      }
    />
    <Route path="finish-setup" element={<FinishSetup />} />
    <Route
      path="instant-book"
      element={
        <RedirectRoute>
          <InstantBook />
        </RedirectRoute>
      }
    />
    <Route
      path="visibility"
      element={
        <RedirectRoute>
          <Visibility />
        </RedirectRoute>
      }
    />
    <Route
      path="price"
      element={
        <RedirectRoute>
          <Price />
        </RedirectRoute>
      }
    />
    <Route
      path="discount"
      element={
        <RedirectRoute>
          <Discount />
        </RedirectRoute>
      }
    />
    <Route
      path="legal-and-create"
      element={
        <RedirectRoute>
          <LegalAndCreate />
        </RedirectRoute>
      }
    />
  </Route>
);
