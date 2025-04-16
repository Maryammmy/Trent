import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import PropertyTypeSkeleton from "../../skeleton/propertyTypeSkeleton";
import { IPropertyType } from "../../../interfaces";
import { usePropertyTypesAPI } from "../../../services/filtersService";
import Image from "@/components/ui/Image";
import { baseURL } from "@/services";

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
            const { id, title, img } = item;
            return (
              <Button
                key={id}
                onClick={() => handleSelectedProperty(id)}
                className={`flex flex-wrap items-center gap-2 font-medium border rounded-full py-2 px-3 ${
                  selectedProperty === id && "bg-zinc-50 border-black"
                }`}
              >
                <div className="w-6 h-6 rounded-md overflow-hidden">
                  <Image
                    imageUrl={baseURL + img}
                    alt="property type"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{title}</span>
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
