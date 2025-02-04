import { useEffect, useState } from "react";
import BackAndNext from "../../../components/hosting/BackAndNext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import toast from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/hosting/ProgressBarsWrapper";

function LocationOfPlace() {
  const { t } = useTranslation();
  const [position, setPosition] = useState<[number, number]>([
    26.8206, 30.8025,
  ]);
  const [zoomLevel] = useState(6);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]);
          toast.success(t("location_accessed"));
        },
        () => {
          toast.error(t("Failed_to_access_location"));
        }
      );
    }
  }, [t]);
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("location_of_place")}
        </h3>
        <p className="max-w-2xl text-secondary font-medium pb-10">
          {t("location_of_place_desc")}
        </p>
        <div className="h-96 w-full rounded-md">
          <MapContainer
            center={position as LatLngExpression}
            zoom={zoomLevel}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
              <Popup>{t("your_current_location")}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["50%", "0px", "0px"]} />
      <BackAndNext
        back="/hosting/type-of-place"
        next="/hosting/floor-plan"
        isNextDisabled={!position}
      />
    </div>
  );
}
export default LocationOfPlace;
