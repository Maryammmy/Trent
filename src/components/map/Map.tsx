import { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { IProperty } from "../../interfaces/property/propertyInterface";
import Card from "./Card";
import { API_KEY } from "../../services";

interface IProps {
  properties: IProperty[] | null;
}
const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "8px",
  margin: "20px auto",
};
const center = {
  lat: 30.0444,
  lng: 31.2357,
};
const Map = ({ properties }: IProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  const [selectedProperty, setSelectedProperty] = useState<IProperty | null>(
    null
  );

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
      {properties?.map((property) => (
        <Marker
          key={property?.id}
          position={{
            lat: Number(property?.latitude),
            lng: Number(property?.longitude),
          }}
          onClick={() => setSelectedProperty(property)}
        />
      ))}

      {selectedProperty && (
        <InfoWindow
          position={{
            lat: Number(selectedProperty.latitude),
            lng: Number(selectedProperty.longitude),
          }}
          onCloseClick={() => setSelectedProperty(null)}
        >
          <Card property={selectedProperty} />
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
