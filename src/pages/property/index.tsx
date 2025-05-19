import { useNavigate, useParams } from "react-router-dom";
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
import Video from "@/components/ui/Video";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import { Helmet } from "react-helmet-async";

const uid = Cookies.get("user_id") || "";
const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const storedCurrency = sessionStorage.getItem("currency");
const parsedCurrency = storedCurrency
  ? JSON.parse(storedCurrency)
  : { currency: "EGP", rate: 1 };
function Property() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = usePropertyAPI(id);
  const propertyDetails: IDetailsProperty = data?.data?.data?.property_details;
  const facilities: IFacilityProperty[] = data?.data?.data?.facility_list;
  const basePrice = Math.round(
    Number(propertyDetails?.price) * Number(parsedCurrency?.rate)
  );
  const minDays = Number(propertyDetails?.min_days);
  const url = `https://www.trent.com.eg/properties/${id}`;
  return (
    <>
      <Helmet>
        <title>{propertyDetails?.title?.[currentLanguage]}</title>
        <meta
          property="og:title"
          content={propertyDetails?.title?.[currentLanguage]}
        />
        <meta
          property="og:description"
          content={propertyDetails?.description?.[currentLanguage]}
        />
        <meta
          property="og:image"
          content={baseURL + propertyDetails?.image_list?.[0]?.img}
        />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="px-5 xl:px-20 py-5 lg:py-10">
        {data ? (
          <>
            <div className="flex justify-between items-center pb-10">
              <h2
                className="font-bold text-2xl text-stone-800"
                data-aos="fade-up"
              >
                {propertyDetails?.title?.[currentLanguage]}
              </h2>
              <div className="flex gap-2">
                <FacebookShareButton url={url}>
                  <button>📘 Facebook</button>
                </FacebookShareButton>

                <WhatsappShareButton url={url}>
                  <button>🟢 WhatsApp</button>
                </WhatsappShareButton>

                <TwitterShareButton url={url}>
                  <button>🐦 Twitter</button>
                </TwitterShareButton>

                <TelegramShareButton url={url}>
                  <button>✈️ Telegram</button>
                </TelegramShareButton>
              </div>
            </div>
            <div>
              <div className="rounded-md overflow-x-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-[250px] lg:h-[300px] overflow-y-auto">
                  {propertyDetails?.image_list?.map((image, i) => (
                    <PhotoViewer key={i} src={baseURL + image?.img}>
                      <div className="relative w-full h-[250px] lg:h-[300px] rounded-md overflow-hidden">
                        <div className="absolute inset-0 bg-black/15 pointer-events-none z-[5]"></div>
                        <div className="w-full h-full">
                          <Image
                            className="w-full h-full object-cover"
                            imageUrl={baseURL + image?.img}
                            alt={`Image ${i + 1}`}
                          />
                        </div>
                      </div>
                    </PhotoViewer>
                  ))}
                </div>
              </div>
              {propertyDetails?.video && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                  <div className="w-full h-[250px] lg:h-[300px] rounded-md overflow-hidden">
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
                  <div className="font-semibold text-lg">
                    <p> {propertyDetails?.address?.[currentLanguage]}</p>
                  </div>
                  <div className="font-semibold text-black text-lg flex flex-wrap gap-1">
                    <p> {propertyDetails?.city?.[currentLanguage]}</p>,
                    <p>
                      {propertyDetails?.government?.name?.[currentLanguage]}
                    </p>
                  </div>
                  <div className="font-semibold text-lg">
                    <p> {propertyDetails?.category?.type?.[currentLanguage]}</p>
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
                        {minDays > 1 ? t("days") : t("day")}
                      </p>
                    </div>
                  ) : null}
                  <div className="font-semibold text-2xl" data-aos="fade-right">
                    <p>
                      <span className="text-primary">
                        {basePrice} {parsedCurrency?.currency}
                      </span>{" "}
                      <span className="text-dark">
                        /{propertyDetails?.period?.name?.[currentLanguage]}
                      </span>
                    </p>
                  </div>
                </div>
                <div data-aos="fade-left">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      if (uid === propertyDetails?.owner_id) {
                        toast.error(t("you_can't_book_your_own_property"));
                        return;
                      }
                      navigate(`/properties/${id}/book`);
                    }}
                    className="bg-primary text-white font-medium block text-center py-2 px-4 rounded-md"
                  >
                    {t("book_now")}
                  </Button>
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
            <ReviewComponent id={id} />
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
