import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import PropertyTypeSkeleton from "../../skeleton/propertyTypeSkeleton";
import { IFacility } from "../../../interfaces";
import { useFacilitiesAPI } from "../../../services/filtersService";

interface Props {
  selectedFacilities: number[];
  handleSelectedFacilities: (id: number) => void;
}
function FacilitiesFilter({
  selectedFacilities,
  handleSelectedFacilities,
}: Props) {
  const { t } = useTranslation();
  const { data } = useFacilitiesAPI();
  const facilities: IFacility[] = data?.data?.data?.facility_list;
  return (
    <div className="py-4 border-b">
      <h2 className="text-lg font-bold pb-2">{t("facilities")}</h2>
      <div className="flex flex-wrap gap-2">
        {!facilities ? (
          <PropertyTypeSkeleton cards={8} />
        ) : facilities?.length ? (
          facilities?.map((item) => {
            const { title, id } = item;
            return (
              <Button
                key={id}
                onClick={() => handleSelectedFacilities(Number(id))}
                className={`flex flex-wrap gap-2 font-medium border rounded-full py-2 px-3 ${
                  selectedFacilities.includes(Number(id)) &&
                  "bg-zinc-50 border-black"
                }`}
              >
                <span>
                  <Home />
                </span>
                <span>{title}</span>
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
