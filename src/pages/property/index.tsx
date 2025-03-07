import { Link, useParams } from "react-router-dom";
import CheckDates from "../../components/property/CheckDates";
import HostedBy from "../../components/property/HostedBy";
import Image from "../../components/ui/Image";
import { images } from "../../data";
import ReviewComponent from "../../components/property/reviews/ReviewComponent";
import Iframe from "../../components/ui/Iframe";
import Amenities from "../../components/property/Amenities";
import { useTranslation } from "react-i18next";
import { usePropertyAPI } from "../../services/propertyService";
import {
  IDetailsProperty,
  IFacilityProperty,
  ISingleProperty,
} from "../../interfaces/propertyInterface";
import { CurrentLanguage } from "../../interfaces";
import { Grip } from "lucide-react";

const currentLanguage = localStorage.getItem("i18nextLng") as CurrentLanguage;
function Property() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = usePropertyAPI(id || "");
  const property: ISingleProperty = data?.data?.data;
  const propertyDetails: IDetailsProperty = property?.property_details;
  const facilities: IFacilityProperty[] = property?.facility_list;

  return (
    <>
      <div className="px-5 xl:px-20 py-5 lg:py-6">
        <div className="pb-6">
          <h2 className="font-bold text-2xl text-stone-800">
            {propertyDetails?.title?.[currentLanguage]}
          </h2>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {images?.slice(0, 3)?.map((image: string, i: number) => (
              <div key={i} className={`w-full h-[250px] lg:h-[300px]`}>
                <Image
                  className="w-full h-full object-cover rounded-md"
                  imageUrl={image}
                  alt={`Image ${i + 1}`}
                />
              </div>
            ))}
          </div>
          <Link
            to={`/properties/1/gallery`}
            className="absolute bottom-2 right-8 flex items-center gap-1 bg-white py-1 px-2 border border-black rounded-md"
          >
            <span>
              <Grip size={15} />
            </span>
            <span className="font-medium text-sm ">{t("show_all_photos")}</span>
          </Link>
        </div>
        <div className="py-8 flex flex-col lg:flex-row gap-10 xl:gap-20 md:justify-between">
          <div className="flex-[2]">
            <div className="flex flex-col gap-1 pb-5">
              <div className="font-medium text-black text-2xl flex gap-1">
                <p> {propertyDetails?.city?.[currentLanguage]}</p>,
                <p> {propertyDetails?.government?.name?.[currentLanguage]}</p>
              </div>
              <div className="font-medium flex gap-1">
                <div className="flex gap-1">
                  <p>{t("guest_count")}</p>
                  <span>{propertyDetails?.guest_count}</span>
                </div>
                <span>,</span>
                <div className="flex gap-1">
                  <p>{t("beds_count")}</p>
                  <span>{propertyDetails?.beds_count}</span>
                </div>
                <span>,</span>
                <div className="flex gap-1">
                  <p>{t("bathrooms_count")}</p>
                  <span>{propertyDetails?.bathrooms_count}</span>
                </div>
              </div>
              <div className="font-semibold">
                <p>
                  <span className="text-primary">
                    {propertyDetails?.price} {t("price_per_night")}
                  </span>{" "}
                  <span className="text-dark">
                    / {propertyDetails?.period?.name?.[currentLanguage]}
                  </span>
                </p>
              </div>
            </div>
            <HostedBy
              host={propertyDetails?.owner}
              guestRules={propertyDetails?.guest_rules?.[currentLanguage]}
            />
            <Amenities facilities={facilities} />
          </div>
          <CheckDates />
        </div>
        <ReviewComponent />
        <div className="max-w-7xl mx-auto py-5">
          <Iframe width="100%" />
        </div>
      </div>
    </>
  );
}

export default Property;
