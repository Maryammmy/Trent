import { useTranslation } from "react-i18next";
import { IFacilityProperty } from "../../interfaces/propertyInterface";
import { CurrentLanguage } from "../../interfaces";
import Image from "../ui/Image";
interface IProps {
  facilities: IFacilityProperty[];
}
const currentLanguage = localStorage.getItem("i18nextLng") as CurrentLanguage;
function Amenities({ facilities }: IProps) {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-semibold py-6">
        {t("what_this_place_offers")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 max-w-lg">
        {facilities?.map((item, index) => {
          const { title, img } = item;
          return (
            <div key={index} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md overflow-hidden">
                <Image
                  imageUrl={img}
                  alt="facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium">{title?.[currentLanguage]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Amenities;
