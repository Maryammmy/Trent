import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import PropertyTypeSkeleton from "../../skeleton/propertyTypeSkeleton";
import { IFacility } from "../../../interfaces";
import { useFacilitiesAPI } from "../../../services/filtersService";
import Image from "@/components/ui/Image";
import { baseURL } from "@/services";

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
            const { id, title, img } = item;
            return (
              <Button
                key={id}
                onClick={() => handleSelectedFacilities(Number(id))}
                className={`flex flex-wrap items-center gap-2 font-medium border rounded-full py-2 px-3 ${
                  selectedFacilities.includes(Number(id)) &&
                  "bg-zinc-50 border-black"
                }`}
              >
                <div className="w-6 h-6 rounded-md overflow-hidden">
                  <Image
                    imageUrl={baseURL + img}
                    className="w-full h-full object-cover"
                    alt="facility"
                  />
                </div>
                <span>{title}</span>
              </Button>
            );
          })
        ) : (
          <div className="flex justify-center items-center text-lg text-dark font-medium w-full">
            {t("no_facilities_found")}
          </div>
        )}
      </div>
    </div>
  );
}

export default FacilitiesFilter;
