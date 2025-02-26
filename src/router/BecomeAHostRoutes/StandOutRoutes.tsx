import { Route } from "react-router-dom";
import RedirectRoute from "../../middleware/RedirectRoute";
import StandOut from "../../pages/becomeAHost/standOut";
import Facilities from "../../pages/becomeAHost/standOut/Facilities";
import Images from "../../pages/becomeAHost/standOut/Images";
import UploadVideo from "../../pages/becomeAHost/standOut/UploadVideo";
import Description from "../../pages/becomeAHost/standOut/Description";
import Title from "../../pages/becomeAHost/standOut/Title";
import City from "../../pages/becomeAHost/standOut/City";
import Compound from "../../pages/becomeAHost/standOut/Compound";
import AddressAndFloor from "../../pages/becomeAHost/standOut/AddressAndFloor";

const StandOutRoutes = (
  <>
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
      path="video"
      element={
        <RedirectRoute>
          <UploadVideo />
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
    <Route
      path="city"
      element={
        <RedirectRoute>
          <City />
        </RedirectRoute>
      }
    />
    <Route
      path="compound"
      element={
        <RedirectRoute>
          <Compound />
        </RedirectRoute>
      }
    />
    <Route
      path="address-and-floor"
      element={
        <RedirectRoute>
          <AddressAndFloor />
        </RedirectRoute>
      }
    />
  </>
);

export default StandOutRoutes;
