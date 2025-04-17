import { Route } from "react-router-dom";
import StandOut from "../../pages/becomeAHost/standOut";
import Facilities from "../../pages/becomeAHost/standOut/Facilities";
import Images from "../../pages/becomeAHost/standOut/Images";
import UploadVideo from "../../pages/becomeAHost/standOut/UploadVideo";
import Description from "../../pages/becomeAHost/standOut/Description";
import Title from "../../pages/becomeAHost/standOut/Title";
import City from "../../pages/becomeAHost/standOut/City";
import Compound from "../../pages/becomeAHost/standOut/Compound";
import AddressAndFloor from "../../pages/becomeAHost/standOut/AddressAndFloor";
import ProtectedRoutes from "../../middleware/ProtectedRoutes";

export const StandOutRoutes = (
  <>
    <Route path="stand-out" element={<StandOut />} />
    <Route
      path="facilities"
      element={
        <ProtectedRoutes>
          <Facilities />
        </ProtectedRoutes>
      }
    />
    <Route
      path="images"
      element={
        <ProtectedRoutes>
          <Images />
        </ProtectedRoutes>
      }
    />
    <Route
      path="video"
      element={
        <ProtectedRoutes>
          <UploadVideo />
        </ProtectedRoutes>
      }
    />
    <Route
      path="title"
      element={
        <ProtectedRoutes>
          <Title />
        </ProtectedRoutes>
      }
    />
    <Route
      path="description"
      element={
        <ProtectedRoutes>
          <Description />
        </ProtectedRoutes>
      }
    />
    <Route
      path="city"
      element={
        <ProtectedRoutes>
          <City />
        </ProtectedRoutes>
      }
    />
    <Route
      path="compound"
      element={
        <ProtectedRoutes>
          <Compound />
        </ProtectedRoutes>
      }
    />
    <Route
      path="address-and-floor"
      element={
        <ProtectedRoutes>
          <AddressAndFloor />
        </ProtectedRoutes>
      }
    />
  </>
);
