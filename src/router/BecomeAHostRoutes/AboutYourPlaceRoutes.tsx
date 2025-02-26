import { Route } from "react-router-dom";
import RedirectRoute from "../../middleware/RedirectRoute";
import AboutYourPlace from "../../pages/becomeAHost/aboutYourPlace";
import PropertyType from "../../pages/becomeAHost/aboutYourPlace/PropertyType";
import FloorPlan from "../../pages/becomeAHost/aboutYourPlace/FloorPlan";
import Location from "../../pages/becomeAHost/aboutYourPlace/Location";

const AboutYourPlaceRoutes = (
  <>
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
          <Location />
        </RedirectRoute>
      }
    />
  </>
);

export default AboutYourPlaceRoutes;
