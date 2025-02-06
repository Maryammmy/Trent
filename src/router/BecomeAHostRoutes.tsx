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

export const BecomeAHostRoutes = (
  <Route
    path="/become-a-host"
    element={<BecomeAHostLayout />}
    errorElement={<ErrorHandler />}
  >
    <Route index element={<GetStartedToHost />} />
    <Route path="about-your-place" element={<AboutYourPlace />} />
    <Route path="choose-place" element={<ChoosePlace />} />
    <Route path="type-of-place" element={<TypeOfPlace />} />
    <Route path="location" element={<LocationOfPlace />} />
    <Route path="floor-plan" element={<FloorPlan />} />
    <Route path="bathrooms" element={<BathRooms />} />
    <Route path="occupancy" element={<Occupancy />} />
    <Route path="stand-out" element={<StandOut />} />
    <Route path="amenities" element={<AmenitiesForProperty />} />
    <Route path="photos" element={<PhotosForProperty />} />
    <Route path="title" element={<TitleForProperty />} />
    <Route path="description" element={<DescriptionForProperty />} />
    <Route path="finish-setup" element={<FinishSetup />} />
    <Route path="instant-book" element={<InstantBook />} />
    <Route path="visibility" element={<Visibility />} />
    <Route path="price" element={<Price />} />
    <Route path="discount" element={<Discount />} />
    <Route path="legal-and-create" element={<LegalAndCreate />} />
  </Route>
);
