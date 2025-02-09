import { Route } from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import GetStartedToHost from "../pages/becomeAHost";
import AboutYourPlace from "../pages/becomeAHost/aboutYourPlace";
import ChoosePlace from "../pages/becomeAHost/aboutYourPlace/ChoosePlace";
import TypeOfPlace from "../pages/becomeAHost/aboutYourPlace/TypeOfPlace";
import LocationOfPlace from "../pages/becomeAHost/aboutYourPlace/LocationOfPlace";
import FloorPlan from "../pages/becomeAHost/aboutYourPlace/FloorPlan";
import StandOut from "../pages/becomeAHost/standOut";
import AmenitiesForProperty from "../pages/becomeAHost/standOut/AmenitiesForProperty";
import PhotosForProperty from "../pages/becomeAHost/standOut/PhotosForProperty";
import TitleForProperty from "../pages/becomeAHost/standOut/TitleForProperty";
import DescriptionForProperty from "../pages/becomeAHost/standOut/DescriptionForProperty";
import FinishSetup from "../pages/becomeAHost/finishSetup";
import InstantBook from "../pages/becomeAHost/finishSetup/InstantBook";
import Visibility from "../pages/becomeAHost/finishSetup/Visibility";
import Price from "../pages/becomeAHost/finishSetup/Price";
import Discount from "../pages/becomeAHost/finishSetup/Discount";
import LegalAndCreate from "../pages/becomeAHost/finishSetup/LegalAndCreate";
import BecomeAHostLayout from "../layouts/BecomeAHost";
import BathRooms from "../pages/becomeAHost/aboutYourPlace/Bathrooms";
import Occupancy from "../pages/becomeAHost/aboutYourPlace/Occupancy";
import RedirectRoute from "../middleware/RedirectRoute";
export const BecomeAHostRoutes = (
  <Route
    path="/become-a-host"
    element={<BecomeAHostLayout />}
    errorElement={<ErrorHandler />}
  >
    <Route index element={<GetStartedToHost />} />
    <Route path="about-your-place" element={<AboutYourPlace />} />
    <Route
      path="choose-place"
      element={
        <RedirectRoute>
          <ChoosePlace />
        </RedirectRoute>
      }
    />
    <Route
      path="type-of-place"
      element={
        <RedirectRoute>
          <TypeOfPlace />
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
    <Route
      path="floor-plan"
      element={
        <RedirectRoute>
          <FloorPlan />
        </RedirectRoute>
      }
    />
    <Route
      path="bathrooms"
      element={
        <RedirectRoute>
          <BathRooms />
        </RedirectRoute>
      }
    />
    <Route
      path="occupancy"
      element={
        <RedirectRoute>
          <Occupancy />
        </RedirectRoute>
      }
    />
    <Route path="stand-out" element={<StandOut />} />
    <Route
      path="amenities"
      element={
        <RedirectRoute>
          <AmenitiesForProperty />
        </RedirectRoute>
      }
    />
    <Route
      path="photos"
      element={
        <RedirectRoute>
          <PhotosForProperty />
        </RedirectRoute>
      }
    />
    <Route
      path="title"
      element={
        <RedirectRoute>
          <TitleForProperty />
        </RedirectRoute>
      }
    />
    <Route
      path="description"
      element={
        <RedirectRoute>
          <DescriptionForProperty />
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
