import { googleMapsApiKey } from "@/services";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";

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
    googleMapsApiKey,
  });
  const { t } = useTranslation();

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center text-lg h-[50vh] text-dark font-medium w-full">
        {t("loading_map")}
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
