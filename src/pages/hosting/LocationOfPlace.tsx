import { useEffect, useState } from "react";
import BackAndNext from "../../components/hosting/BackAndNext";
import PrograssBar from "../../components/ui/PrograssBar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import toast from "react-hot-toast";
import "leaflet/dist/leaflet.css";

function LocationOfPlace() {
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
          toast.success("Location accessed successfully!");
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to access location. Please enable GPS.");
        }
      );
    }
  }, []);
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-2">
          Where's your place located?
        </h3>
        <p className="max-w-2xl text-secondary font-medium pb-10">
          Your address is only shared with guests after they’ve made a
          reservation.
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
              <Popup>Your Current Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <PrograssBar width="30%" />
      <BackAndNext back="/hosting/type-of-place" next="/hosting/floor-plan" />
    </div>
  );
}
export default LocationOfPlace;
