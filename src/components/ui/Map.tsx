import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { API_KEY } from "../../services";

interface IProps {
  latitdude: number;
  longitude: number;
}

const containerStyle = {
  width: "100%",
  height: "500px",
};

const Map = ({ latitdude, longitude }: IProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-[50vh] text-dark font-medium w-full">
        Loading Map...
      </div>
    );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: latitdude, lng: longitude }}
      zoom={10}
    >
      <Marker position={{ lat: latitdude, lng: longitude }} />
    </GoogleMap>
  );
};

export default Map;
