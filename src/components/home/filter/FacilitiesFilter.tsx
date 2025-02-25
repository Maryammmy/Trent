import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import { useGetData } from "../../../hooks/useGetData";
import { Home } from "lucide-react";
import PropertyTypeSkeleton from "../../skeleton/propertyTypeSkeleton";
import { IFacility } from "../../../interfaces/landingInterface";

interface Props {
  selectedFacilities: string[];
  handleSelectedFacilities: (amenity: string) => void;
}
const currentLanguage = localStorage.getItem("i18nextLng");
function FacilitiesFilter({
  selectedFacilities,
  handleSelectedFacilities,
}: Props) {
  const { t } = useTranslation();
  const { data } = useGetData(
    ["facilities"],
    `user_api/u_facility.php?lang=${currentLanguage}`
  );
  const facilities: IFacility[] = data?.data?.facilitylist;
  return (
    <div className="py-4 border-b">
      <h2 className="text-lg font-bold pb-4">{t("facilities")}</h2>
      <div className="flex flex-wrap gap-2">
        {!facilities ? (
          <PropertyTypeSkeleton cards={8} />
        ) : facilities?.length ? (
          facilities?.map((item) => {
            const { title, id } = item;
            return (
              <Button
                key={id}
                onClick={() => handleSelectedFacilities(id)}
                className={`flex flex-wrap gap-2 font-medium border rounded-full py-2 px-3 ${
                  selectedFacilities.includes(id) && "bg-zinc-50 border-black"
                }`}
              >
                <span>{title}</span>
                <span>
                  <Home />
                </span>
              </Button>
            );
          })
        ) : (
          <div className="flex justify-center items-center text-dark font-medium w-full">
            No facilities found
          </div>
        )}
      </div>
    </div>
  );
}

export default FacilitiesFilter;
