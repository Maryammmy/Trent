import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import { useGetData } from "../../../hooks/useGetData";
import { Home } from "lucide-react";
import PropertyTypeSkeleton from "../../skeleton/propertyTypeSkeleton";
import { IPropertyType } from "../../../interfaces";

interface Props {
  selectedProperty: string;
  handleSelectedProperty: (property: string) => void;
}
const currentLanguage = localStorage.getItem("i18nextLng");
function PropertyTypeFilter({
  selectedProperty,
  handleSelectedProperty,
}: Props) {
  const { t } = useTranslation();
  const { data } = useGetData(
    ["propertyTypeList"],
    `user_api/u_property_type.php?lang=${currentLanguage}`
  );
  const propertyTypeList: IPropertyType[] = data?.data?.type_list;
  return (
    <div className="py-4">
      <h2 className="text-lg font-bold pb-4">{t("property_type")}</h2>
      <div className="flex flex-wrap gap-2">
        {!propertyTypeList ? (
          <PropertyTypeSkeleton cards={8} />
        ) : propertyTypeList?.length ? (
          propertyTypeList?.map((item) => {
            const { title, id } = item;
            return (
              <Button
                key={id}
                onClick={() => handleSelectedProperty(id)}
                className={`flex gap-2 font-medium border rounded-full py-2 px-4 ${
                  selectedProperty === id && "bg-zinc-50 border-black"
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
  );
}

export default PropertyTypeFilter;
