// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { IProperty } from "../../interfaces/property/propertyInterface";
// import Card from "./Card";

// // import L from "leaflet";
// interface IProps {
//   properties: IProperty[] | null;
// }
// const Map = ({ properties }: IProps) => {
//   console.log(properties);
//   const position: [number, number] = [26.8206, 30.8025];
//   //   const customIcon = new L.Icon({
//   //     iconUrl: "/custom-icon.png",
//   //     iconSize: [30, 40],
//   //     iconAnchor: [15, 40],
//   //     popupAnchor: [0, -40],
//   //   });
//   //   const locations = [
//   //     {
//   //       id: 1,
//   //       name: "Zakopane, Poland",
//   //       position: [49.2992, 19.9496] as [number, number],
//   //       price: "€46",
//   //     },
//   //     {
//   //       id: 2,
//   //       name: "Vienna, Austria",
//   //       position: [48.2082, 16.3738] as [number, number],
//   //       price: "€170",
//   //     },
//   //     {
//   //       id: 3,
//   //       name: "Cluj-Napoca, Romania",
//   //       position: [46.7712, 23.6236] as [number, number],
//   //       price: "€406",
//   //     },
//   //   ];
//   return (
//     <MapContainer
//       center={position}
//       zoom={6}
//       className="w-full h-[50vh] rounded-md"
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {properties?.map((property) => (
//         <Marker
//           key={property?.id}
//           position={[Number(property?.latitude), Number(property?.longitude)]}
//         >
//           <Popup className="">
//             <Card property={property} />
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

import { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { IProperty } from "../../interfaces/property/propertyInterface";
import Card from "./Card";

interface IProps {
  properties: IProperty[] | null;
}

const containerStyle = {
  width: "100%",
  height: "50vh",
  borderRadius: "8px",
};

const center = {
  lat: 26.8206,
  lng: 30.8025,
};

const API_KEY = "AIzaSyDbeg4RQW5M5LL7P-2LKaVjOnsMghPDR9o"; // استبدل بمفتاح API الخاص بك

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
          onClick={() => setSelectedProperty(property)} // فتح InfoWindow عند النقر
        />
      ))}

      {selectedProperty && (
        <InfoWindow
          position={{
            lat: Number(selectedProperty.latitude),
            lng: Number(selectedProperty.longitude),
          }}
          onCloseClick={() => setSelectedProperty(null)} // إغلاق InfoWindow عند النقر على ×
        >
          <div>
            <Card property={selectedProperty} />
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
