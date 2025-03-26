import { lazy, Suspense, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  OverlayView,
  InfoWindowF,
} from "@react-google-maps/api";
import { IProperty } from "../../interfaces/property/propertyInterface";
import { API_KEY } from "../../services";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";
import PropertyCartSkeleton from "../skeleton/PropertyCartSkeleton";
const Cart = lazy(() => import("./Cart"));
interface IProps {
  properties: IProperty[] | null;
}
const ITEMS_TO_LOAD = 10;
const containerStyle = {
  width: "100%",
  height: "100vh",
  borderRadius: "8px",
  margin: "20px auto",
};
const center = {
  lat: 30.0444,
  lng: 31.2357,
};

const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -height,
});

const Map = ({ properties }: IProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });
  const [selectedProperties, setSelectedProperties] = useState<
    IProperty[] | null
  >(null);
  const groupedProperties = properties?.reduce((acc, property) => {
    const key = `${property?.latitude}-${property?.longitude}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(property);
    return acc;
  }, {} as Record<string, IProperty[]>);
  const handleShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_TO_LOAD);
      setLoading(false);
    }, 1000);
  };
  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-[50vh] text-dark font-medium w-full">
        Loading Map...
      </div>
    );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      onClick={() => setSelectedProperties(null)}
    >
      {groupedProperties &&
        Object.entries(groupedProperties).map(([key, group], index) => {
          const [lat, lng] = key.split("-").map(Number);
          const isSelected = selectedProperties?.some((property) =>
            group.some((p) => p?.id === property?.id)
          );
          return (
            <OverlayView
              key={key}
              position={{ lat, lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={() => getPixelPositionOffset(80, 40)}
            >
              <Button
                style={{
                  transform: `translateY(${index * 15}px)`,
                }}
                className={`p-2 rounded-full font-bold text-sm
                   text-center cursor-pointer inline-flex items-center justify-center
                   shadow-md transition-all duration-300 w-auto min-w-[60px] max-w-[200px] ${
                     isSelected
                       ? "bg-primary text-white relative z-10"
                       : "bg-white text-black"
                   }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProperties(group);
                }}
              >
                <span className="whitespace-nowrap">
                  {group?.length > 1
                    ? `${group?.length} Properties`
                    : `${group[0]?.price} EGP`}
                </span>
              </Button>
            </OverlayView>
          );
        })}
      {selectedProperties && (
        <InfoWindowF
          position={{
            lat: Number(selectedProperties[0]?.latitude),
            lng: Number(selectedProperties[0]?.longitude),
          }}
          onCloseClick={() => setSelectedProperties(null)}
          options={{
            pixelOffset: new window.google.maps.Size(0, -30),
          }}
        >
          <>
            {selectedProperties?.slice(0, visibleCount)?.map((property) => (
              <Suspense
                fallback={
                  <PropertyCartSkeleton
                    cards={1}
                    width="250px"
                    height="150px"
                  />
                }
                key={property.id}
              >
                <Cart property={property} />
              </Suspense>
            ))}
            {selectedProperties &&
              visibleCount < selectedProperties?.length &&
              !loading && (
                <div className="flex justify-center items-center pb-4">
                  <Button
                    onClick={handleShowMore}
                    className="zoom text-primary border-2 border-primary font-medium py-2 px-4 rounded-lg text-center"
                  >
                    <span>{t("show_more")}</span>
                  </Button>
                </div>
              )}
            {loading && (
              <PropertyCartSkeleton cards={1} width="250px" height="150px" />
            )}
          </>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
};

export default Map;
