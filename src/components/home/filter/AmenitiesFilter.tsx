import Button from "../../ui/Button";
import { amenities } from "../../../data/property/amenities";
import { useTranslation } from "react-i18next";
import { useGetData } from "../../../hooks/useGetData";

interface Props {
  selectedAmenities: string[];
  handleSelectedAmenities: (amenity: string) => void;
}

function AmenitiesFilter({
  selectedAmenities,
  handleSelectedAmenities,
}: Props) {
  const { t } = useTranslation();
  const { data } = useGetData(["amenities"], "user_api/u_facility.php?lang=ar");
  console.log(data);
  return (
    <div className="py-4 border-b">
      <h2 className="text-lg font-bold pb-4">{t("amenities")}</h2>
      <div className="flex flex-wrap gap-2">
        {amenities.slice(0, 4).map((item, index) => {
          const { text, icon } = item;
          return (
            <Button
              key={index}
              onClick={() => handleSelectedAmenities(text)}
              className={`flex flex-wrap gap-2 font-medium border rounded-full py-2 px-3 ${
                selectedAmenities.includes(text) && "bg-zinc-50 border-black"
              }`}
            >
              <span>{text}</span>
              <span>{icon}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default AmenitiesFilter;
