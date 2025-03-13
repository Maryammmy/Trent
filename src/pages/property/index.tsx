import { Link, useParams } from "react-router-dom";
import CheckDates from "../../components/property/CheckDates";
import HostedBy from "../../components/property/HostedBy";
import Image from "../../components/ui/Image";
import ReviewComponent from "../../components/property/reviews/ReviewComponent";
import Iframe from "../../components/ui/Iframe";
import Amenities from "../../components/property/Amenities";
import { useTranslation } from "react-i18next";
import { usePropertyAPI } from "../../services/propertyService";
import {
  IDetailsProperty,
  IFacilityProperty,
} from "../../interfaces/property/propertyInterface";
import { Grip } from "lucide-react";
import { CurrentLanguage } from "../../types";
import { baseURL } from "../../services";
import PropertySkeleton from "../../components/skeleton/PropertySkeleton";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;

function Property() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = usePropertyAPI(id || "");
  const propertyDetails: IDetailsProperty = data?.data?.data?.property_details;
  const facilities: IFacilityProperty[] = data?.data?.data?.facility_list;

  return (
    <>
      <div className="px-5 xl:px-20 py-5 lg:py-6">
        {data ? (
          <>
            <div className="pb-6">
              <h2
                className="font-bold text-2xl text-stone-800"
                data-aos="fade-down"
              >
                {propertyDetails?.title?.[currentLanguage]}
              </h2>
            </div>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {propertyDetails?.image_list?.slice(0, 3)?.map((image, i) => (
                  <div
                    data-aos="fade-down"
                    key={i}
                    className={`w-full h-[250px] lg:h-[300px] rounded-md overflow-hidden`}
                  >
                    <Image
                      className="w-full h-full object-cover"
                      imageUrl={baseURL + image.img}
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
                <span className="font-medium text-sm ">
                  {t("show_all_photos")}
                </span>
              </Link>
            </div>
            <div className="py-8 flex flex-col lg:flex-row gap-10 xl:gap-20 md:justify-between">
              <div className="flex-[2]">
                <div className="flex flex-col gap-1 pb-5">
                  <div
                    className="font-medium text-black text-2xl flex gap-1"
                    data-aos="fade-up"
                  >
                    <p> {propertyDetails?.city?.[currentLanguage]}</p>,
                    <p>
                      {propertyDetails?.government?.name?.[currentLanguage]}
                    </p>
                  </div>
                  <div
                    className="font-medium flex flex-wrap gap-1"
                    data-aos="fade-down"
                  >
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
                  <div className="font-semibold" data-aos="fade-down">
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
          </>
        ) : (
          <PropertySkeleton />
        )}
      </div>
    </>
  );
}

export default Property;
