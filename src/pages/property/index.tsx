import { useParams } from "react-router-dom";
import HostedBy from "../../components/property/HostedBy";
import Image from "../../components/ui/Image";
import Amenities from "../../components/property/Amenities";
import { useTranslation } from "react-i18next";
import { usePropertyAPI } from "../../services/propertyService";
import { IDetailsProperty, IFacilityProperty } from "../../interfaces/property";
import { CurrentLanguage } from "../../types";
import { baseURL } from "../../services";
import PropertySkeleton from "../../components/skeleton/PropertySkeleton";
import Map from "../../components/ui/Map";
import ReviewComponent from "@/components/property/reviews/ReviewComponent";
import PhotoViewer from "@/components/ui/PhotoViewer";
import { Link } from "react-router-dom";
import Video from "@/components/ui/Video";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;

function Property() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = usePropertyAPI(id);
  const propertyDetails: IDetailsProperty = data?.data?.data?.property_details;
  const facilities: IFacilityProperty[] = data?.data?.data?.facility_list;
  const basePrice = parseInt(propertyDetails?.price);
  const minDays = Number(propertyDetails?.min_days);
  return (
    <>
      <div className="px-5 xl:px-20 py-5 lg:py-6">
        {data ? (
          <>
            <div className="pb-6">
              <h2
                className="font-bold text-2xl text-stone-800"
                data-aos="fade-up"
              >
                {propertyDetails?.title?.[currentLanguage]}
              </h2>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {propertyDetails?.image_list?.slice(0, 3)?.map((image, i) => (
                  <PhotoViewer key={i} src={baseURL + image.img}>
                    <div
                      data-aos="fade-left"
                      className="relative w-full h-[250px] lg:h-[300px] rounded-md overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-black/15 pointer-events-none z-[5]"></div>
                      <div className="w-full h-full">
                        <Image
                          className="w-full h-full object-cover"
                          imageUrl={baseURL + image.img}
                          alt={`Image ${i + 1}`}
                        />
                      </div>
                    </div>
                  </PhotoViewer>
                ))}
              </div>
              {propertyDetails?.video && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                  <div className=" w-full h-[250px] lg:h-[300px] rounded-md overflow-hidden">
                    <div className="w-full h-full">
                      <Video
                        videoUrl={baseURL + propertyDetails?.video}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* <Link
                to={`/properties/1/gallery`}
                className="absolute bottom-2 right-8 flex items-center gap-1 bg-white py-1 px-2 border border-black rounded-md"
              >
                <span>
                  <Grip size={15} />
                </span>
                <span className="font-medium text-sm ">
                  {t("show_all_photos")}
                </span>
              </Link> */}
            </div>
            <div className="py-8">
              <div className="flex gap-5 flex-wrap justify-between items-center">
                <div className="flex flex-col gap-1" data-aos="fade-right">
                  <div className="font-medium text-black text-2xl flex flex-wrap gap-1">
                    <p> {propertyDetails?.city?.[currentLanguage]}</p>,
                    <p>
                      {propertyDetails?.government?.name?.[currentLanguage]}
                    </p>
                  </div>
                  <div className="font-medium flex flex-wrap gap-1">
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
                    <span>,</span>
                    <div className="flex gap-1">
                      <p>{t("total_area")}</p>
                      <span>
                        {propertyDetails?.sqrft} {t("m2")}
                      </span>
                    </div>
                  </div>
                  {minDays ? (
                    <div className="font-medium flex flex-wrap gap-1">
                      <p>
                        {t("minimum_stay")} : {propertyDetails?.min_days}{" "}
                        {minDays > 1 ? t("nights") : t("night")}
                      </p>
                    </div>
                  ) : null}
                  <div className="font-semibold" data-aos="fade-right">
                    <p>
                      <span className="text-primary">
                        {basePrice} {t("price_per_night")}
                      </span>{" "}
                      <span className="text-dark">
                        /{propertyDetails?.period?.name?.[currentLanguage]}
                      </span>
                    </p>
                  </div>
                </div>
                <div data-aos="fade-left">
                  <Link
                    to={`/properties/${id}/book`}
                    className="bg-primary text-white font-medium block text-center py-2 px-4 rounded-md"
                  >
                    {t("book_now")}
                  </Link>
                </div>
              </div>
              <div className="pt-5" data-aos="fade-right">
                <h4 className="text-lg font-bold">{t("about_this_place")}</h4>
                <p className="pt-1 font-medium">
                  {propertyDetails?.description?.[currentLanguage]}
                </p>
              </div>
              <HostedBy
                id={id}
                ownerId={propertyDetails?.owner_id}
                owner={propertyDetails?.owner}
                guestRules={propertyDetails?.guest_rules?.[currentLanguage]}
              />
              <Amenities facilities={facilities} />
            </div>
            <ReviewComponent />
            <div className="max-w-7xl mx-auto py-5">
              <Map
                latitdude={Number(propertyDetails?.latitude)}
                longitude={Number(propertyDetails?.longitude)}
              />
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
