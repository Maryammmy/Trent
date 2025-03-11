import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";

const Map = () => {
  const position: [number, number] = [51.505, -0.09]; // إحداثيات البداية
  //   const customIcon = new L.Icon({
  //     iconUrl: "/custom-icon.png",
  //     iconSize: [30, 40],
  //     iconAnchor: [15, 40],
  //     popupAnchor: [0, -40],
  //   });
  const locations = [
    {
      id: 1,
      name: "Zakopane, Poland",
      position: [49.2992, 19.9496] as [number, number],
      price: "€46",
    },
    {
      id: 2,
      name: "Vienna, Austria",
      position: [48.2082, 16.3738] as [number, number],
      price: "€170",
    },
    {
      id: 3,
      name: "Cluj-Napoca, Romania",
      position: [46.7712, 23.6236] as [number, number],
      price: "€406",
    },
  ];
  return (
    <MapContainer
      center={position}
      zoom={6}
      style={{ height: "500px", width: "100%" }}
    >
      {/* طبقة الخريطة */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((loc) => (
        <Marker key={loc.id} position={loc.position}>
          <Popup>
            {loc.name} - {loc.price}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
