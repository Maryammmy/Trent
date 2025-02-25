import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import toast from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import Button from "../../../components/ui/Button";

const storedLocation = sessionStorage.getItem("selectedLocation");
function LocationOfPlace() {
  const { t } = useTranslation();
  const backButton = "/become-a-host/floor-plan";
  const [position, setPosition] = useState<[number, number] | null>(
    storedLocation ? JSON.parse(storedLocation) : null
  );
  const defaultEgyptPosition: [number, number] = [26.8206, 30.8025];
  const [zoomLevel] = useState(6);
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error(t("Geolocation_not_supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        const newPosition: [number, number] = [latitude, longitude];
        setPosition(newPosition);
        sessionStorage.setItem("selectedLocation", JSON.stringify(newPosition));
        toast.success(t("location_accessed"));
      },
      () => {
        toast.error(t("Failed_to_access_location"));
      }
    );
  };
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("location_of_place")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-5">
          {t("location_of_place_desc")}
        </p>
        <div className="flex justify-center">
          <Button
            onClick={handleGetLocation}
            className="mb-5 bg-primary text-white px-4 py-2 rounded-md font-medium"
          >
            {t("get_your_current_location")}
          </Button>
        </div>
        <div className="h-96 w-full rounded-md">
          <MapContainer
            center={position ? position : defaultEgyptPosition}
            zoom={zoomLevel}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {position && (
              <Marker position={position}>
                <Popup>{t("your_current_location")}</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["50%", "0px", "0px"]} />
      <BackAndNext
        back={backButton}
        next="/become-a-host/stand-out"
        isNextDisabled={!position}
        allowNext={backButton}
      />
    </div>
  );
}

export default LocationOfPlace;
