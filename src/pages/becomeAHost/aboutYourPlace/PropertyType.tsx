import { useState } from "react";
import Button from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import { Home } from "lucide-react";
import PropertyTypeSkeleton from "../../../components/skeleton/propertyTypeSkeleton";
import { IPropertyType } from "../../../interfaces";
import { usePropertyTypesAPI } from "../../../services/filtersService";

const storedPropertyType = sessionStorage.getItem("category_id");
function PropertyType() {
  const { t } = useTranslation();
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>(
    storedPropertyType || ""
  );
  const backButton = "/become-a-host/about-your-place";
  const { data } = usePropertyTypesAPI();
  const propertyTypeList: IPropertyType[] = data?.data?.data?.category_list;
  const handleSelectedPropertyType = (id: string) => {
    setSelectedPropertyType(id);
    sessionStorage.setItem("category_id", id);
  };
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold text-center pb-5 md:pb-10">
          {t("property_type")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {!propertyTypeList ? (
            <PropertyTypeSkeleton cards={8} />
          ) : propertyTypeList?.length ? (
            propertyTypeList?.map((item) => {
              const { title, id } = item;
              return (
                <Button
                  key={id}
                  onClick={() => handleSelectedPropertyType(id)}
                  className={`flex gap-2 font-medium border rounded-full py-2 px-4 ${
                    selectedPropertyType === id && "bg-zinc-50 border-black"
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
              No property type found
            </div>
          )}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["25%", "0px", "0px"]} />
      <BackAndNext
        back={backButton}
        next="/become-a-host/floor-plan"
        isNextDisabled={!selectedPropertyType}
        allowNext={backButton}
      />
    </div>
  );
}

export default PropertyType;
