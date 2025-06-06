import { useTranslation } from "react-i18next";
import { IFacilityProperty } from "../../interfaces/property";
import Image from "../ui/Image";
import { CurrentLanguage } from "../../types";
import { baseURL } from "../../services";
interface IProps {
  facilities: IFacilityProperty[];
}
const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
function Amenities({ facilities }: IProps) {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-semibold pb-3" data-aos="fade-left">
        {t("what_this_place_offers")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 max-w-lg">
        {facilities?.map((item, index) => {
          const { title, img } = item;
          return (
            <div
              key={index}
              className="flex items-center gap-2"
              data-aos="fade-right"
            >
              <div className="w-8 h-8 rounded-md overflow-hidden">
                <Image
                  imageUrl={baseURL + img}
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
