import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import { useGetData } from "../../../hooks/useGetData";
import { ITypeList } from "../../../interfaces/landingInterface";
import { Home } from "lucide-react";

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
    ["propertyType"],
    `user_api/u_property_type.php?lang=${currentLanguage}`
  );
  const typeList: ITypeList[] = data?.data.typelist;
  return (
    <div className="py-4">
      <h2 className="text-lg font-bold pb-4">{t("property_type")}</h2>
      <div className="flex flex-wrap gap-2">
        {typeList?.map((item, index) => {
          const { title } = item;
          return (
            <Button
              key={index}
              onClick={() => handleSelectedProperty(title)}
              className={`flex gap-2 font-medium border rounded-full py-2 px-4 ${
                selectedProperty === title && "bg-zinc-50 border-black"
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

export default PropertyTypeFilter;
