import { Route } from "react-router-dom";
import AboutYourPlace from "../../pages/becomeAHost/aboutYourPlace";
import PropertyType from "../../pages/becomeAHost/aboutYourPlace/PropertyType";
import FloorPlan from "../../pages/becomeAHost/aboutYourPlace/FloorPlan";
import Location from "../../pages/becomeAHost/aboutYourPlace/Location";
import ProtectedRoutes from "../../middleware/ProtectedRoutes";

const AboutYourPlaceRoutes = (
  <>
    <Route path="about-your-place" element={<AboutYourPlace />} />
    <Route
      path="property-type"
      element={
        <ProtectedRoutes>
          <PropertyType />
        </ProtectedRoutes>
      }
    />
    <Route
      path="floor-plan"
      element={
        <ProtectedRoutes>
          <FloorPlan />
        </ProtectedRoutes>
      }
    />
    <Route
      path="location"
      element={
        <ProtectedRoutes>
          <Location />
        </ProtectedRoutes>
      }
    />
  </>
);

export default AboutYourPlaceRoutes;
