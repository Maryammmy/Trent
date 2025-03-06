import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import PropertyTypeSkeleton from "../../skeleton/propertyTypeSkeleton";
import { IPropertyType } from "../../../interfaces";
import { usePropertyTypesAPI } from "../../../services/filtersService";

interface Props {
  selectedProperty: string;
  handleSelectedProperty: (property: string) => void;
}
function PropertyTypeFilter({
  selectedProperty,
  handleSelectedProperty,
}: Props) {
  const { t } = useTranslation();
  const { data } = usePropertyTypesAPI();
  const propertyTypeList: IPropertyType[] = data?.data?.data?.category_list;
  return (
    <div className="py-4">
      <h2 className="text-lg font-bold pb-2">{t("property_type")}</h2>
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
