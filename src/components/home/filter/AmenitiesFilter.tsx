import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import { useGetData } from "../../../hooks/useGetData";
import { IFacilityList } from "../../../interfaces/landingInterface";
import { Home } from "lucide-react";

interface Props {
  selectedAmenities: string[];
  handleSelectedAmenities: (amenity: string) => void;
}
const currentLanguage = localStorage.getItem("i18nextLng");
function AmenitiesFilter({
  selectedAmenities,
  handleSelectedAmenities,
}: Props) {
  const { t } = useTranslation();
  const { data } = useGetData(
    ["amenities"],
    `user_api/u_facility.php?lang=${currentLanguage}`
  );
  const facilitylist: IFacilityList[] = data?.data?.facilitylist;
  return (
    <div className="py-4 border-b">
      <h2 className="text-lg font-bold pb-4">{t("amenities")}</h2>
      <div className="flex flex-wrap gap-2">
        {facilitylist?.slice(0, 4).map((item, index) => {
          const { title, id } = item;
          return (
            <Button
              key={index}
              onClick={() => handleSelectedAmenities(id)}
              className={`flex flex-wrap gap-2 font-medium border rounded-full py-2 px-3 ${
                selectedAmenities.includes(id) && "bg-zinc-50 border-black"
              }`}
            >
              <span>{title}</span>
              <span>
                <Home />
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default AmenitiesFilter;
