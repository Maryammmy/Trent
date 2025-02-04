import { Route } from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import HostingLayout from "../layouts/HostingLayout";
import ChoosePlace from "../pages/hosting/aboutYourPlace/ChoosePlace";
import TypeOfPlace from "../pages/hosting/aboutYourPlace/TypeOfPlace";
import LocationOfPlace from "../pages/hosting/aboutYourPlace/LocationOfPlace";
import FloorPlan from "../pages/hosting/aboutYourPlace/FloorPlan";
import GetStartedToHost from "../pages/hosting";
import StandOut from "../pages/hosting/standOut";
import AboutYourPlace from "../pages/hosting/aboutYourPlace";
import AmenitiesForProperty from "../pages/hosting/standOut/AmenitiesForProperty";
import PhotosForProperty from "../pages/hosting/standOut/PhotosForProperty";
import TitleForProperty from "../pages/hosting/standOut/TitleForProperty";
import DescriptionForProperty from "../pages/hosting/standOut/DescriptionForProperty";
import FinishSetup from "../pages/hosting/finishSetup";

export const HostingRoutes = (
  <Route
    path="/hosting"
    element={<HostingLayout />}
    errorElement={<ErrorHandler />}
  >
    <Route index element={<GetStartedToHost />} />
    <Route path="about-your-place" element={<AboutYourPlace />} />
    <Route path="choose-place" element={<ChoosePlace />} />
    <Route path="type-of-place" element={<TypeOfPlace />} />
    <Route path="location" element={<LocationOfPlace />} />
    <Route path="floor-plan" element={<FloorPlan />} />
    <Route path="stand-out" element={<StandOut />} />
    <Route path="amenities" element={<AmenitiesForProperty />} />
    <Route path="photos" element={<PhotosForProperty />} />
    <Route path="title" element={<TitleForProperty />} />
    <Route path="description" element={<DescriptionForProperty />} />
    <Route path="finish-setup" element={<FinishSetup />} />
  </Route>
);
