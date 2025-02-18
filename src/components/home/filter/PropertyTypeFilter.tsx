import Button from "../../ui/Button";
import { filterPropertyType } from "../../../data";
import { useTranslation } from "react-i18next";
import { useGetData } from "../../../hooks/useGetData";

interface Props {
  selectedProperty: string;
  handleSelectedProperty: (property: string) => void;
}

function PropertyTypeFilter({
  selectedProperty,
  handleSelectedProperty,
}: Props) {
  const { t } = useTranslation();
  const { data } = useGetData(
    ["propertyType"],
    "user_api/u_property_type.php?lang=en"
  );
  console.log(data);
  return (
    <div className="py-4">
      <h2 className="text-lg font-bold pb-4">{t("property_type")}</h2>
      <div className="flex flex-wrap gap-2">
        {filterPropertyType.map((item, index) => {
          const { name, icon } = item;
          return (
            <Button
              key={index}
              onClick={() => handleSelectedProperty(name)}
              className={`flex gap-2 font-medium border rounded-full py-2 px-4 ${
                selectedProperty === name && "bg-zinc-50 border-black"
              }`}
            >
              <span>{name}</span>
              <span>{icon}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default PropertyTypeFilter;
