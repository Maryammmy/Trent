import { useMediaQuery } from "react-responsive";
import HomeSearch from "../components/home/HomeSearch";
import Image from "../components/ui/Image";
import Carsoul from "../components/ui/Carsoul";
import { getResponsiveSettings, responsiveSettings } from "../data/landingData";
import { useGetData } from "../hooks/useGetData";
import SilderSkeleton from "../components/skeleton/SilderSkeleton";
import { CurrentLanguage } from "../types";
import { baseURL } from "../services";
import { useTranslation } from "react-i18next";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
function Home() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const carouselProps = isMobile
    ? { padding: "2px", right: "5px", left: "5px" }
    : isTablet
    ? { padding: "5px" }
    : { padding: "10px" };
  const { data } = useGetData(
    ["slider"],
    `user_api/u_slider_list.php?lang=${currentLanguage}`
  );
  const sliderList = data?.data?.data?.slider_list;
  return (
    <div>
      <div className="bg-home h-[50vh] bg-[length:100%_100%] bg-no-repeat mb-[10vh]">
        <div className="w-full px-5 md:max-w-xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1
            data-aos="fade-up"
            className="text-3xl md:!leading-[60px] lg:!leading-[70px] md:text-5xl lg:text-6xl font-bold text-white text-center"
          >
            {t("home_title")}{" "}
            <span className="text-secondary">{t("today")}</span>
          </h1>
        </div>
        <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <HomeSearch />
        </div>
      </div>
      <div className="sm:px-4" data-aos="fade-down">
        {!sliderList ? (
          <Carsoul
            slidesToShow={4}
            showDot={false}
            showArrow={true}
            autoplay={true}
            responsive={responsiveSettings}
            padding={carouselProps.padding}
            right={carouselProps.right}
            left={carouselProps.left}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-[40vh] w-full sm:px-4">
                <SilderSkeleton />
              </div>
            ))}
          </Carsoul>
        ) : sliderList?.length ? (
          <Carsoul
            slidesToShow={Math.min(sliderList?.length, 4)}
            showDot={false}
            showArrow={true}
            autoplay={true}
            responsive={getResponsiveSettings(sliderList?.length)}
            padding={carouselProps.padding}
            right={carouselProps.right}
            left={carouselProps.left}
            infinite={sliderList?.length > 1}
          >
            {sliderList?.map((item: string, index: number) => (
              <div
                key={index}
                className="h-[40vh] w-full sm:px-4 rounded-md overflow-hidden"
              >
                <Image
                  alt="slider"
                  imageUrl={baseURL + item}
                  className="w-full h-full rounded-md"
                />
              </div>
            ))}
          </Carsoul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
