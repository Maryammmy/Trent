import { useEffect, useState } from "react";
import { buttonData } from "../../data/landing";
import Image from "../ui/Image";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function MobileAppBanner() {
  const { t } = useTranslation();
  const [platform, setPlatform] = useState("desktop");
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    setPlatform(
      /android/i.test(userAgent)
        ? "android"
        : /iPad|iPhone|iPod/i.test(userAgent)
        ? "ios"
        : "desktop"
    );
  }, []);
  return (
    <div className="bg-[#356AA6]">
      <div className="flex flex-col md:flex-row justify-around items-center p-5">
        {isSmallScreen ? (
          <>
            <h2
              className="text-white text-lg md:text-3xl font-semibold max-w-md"
              data-aos="fade-left"
            >
              {t("get_mobile_app")}
            </h2>
            <div className="w-40 h-full">
              <Image
                imageUrl="/images/mobileIsolated.png"
                alt="bannerMobile"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col items-center mt-5 md:mt-0 md:flex-row gap-10">
              {buttonData
                .filter(
                  (btn) => btn.platform === platform || platform === "desktop"
                )
                .map((btn, i) => (
                  <Link
                    to={
                      btn.platform === "android"
                        ? "https://play.google.com/store/apps/details?id=com.catlyst.trent"
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="fade-down"
                    key={i}
                    className="bg-black text-white rounded-md w-52 p-2 flex justify-center items-center gap-2"
                  >
                    <span>{btn.icon}</span>
                    <span className="font-medium flex flex-col items-start">
                      <span>Download on the</span>
                      <span>{btn.label}</span>
                    </span>
                  </Link>
                ))}
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="flex flex-col gap-5">
              <h2
                className="text-white text-lg md:text-3xl font-semibold max-w-md"
                data-aos="fade-left"
              >
                {t("get_mobile_app")}
              </h2>
              <div className="flex flex-col items-center md:flex-row gap-10">
                {buttonData
                  .filter(
                    (btn) => btn.platform === platform || platform === "desktop"
                  )
                  .map((btn, i) => (
                    <Link
                      to={
                        btn.platform === "ios"
                          ? "https://apps.apple.com/us/app/trent-eg/id6744845845"
                          : "https://play.google.com/store/apps/details?id=com.catlyst.trent"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      data-aos="fade-up"
                      key={i}
                      className="bg-black text-white rounded-md w-52 p-2 flex justify-center items-center gap-2"
                    >
                      <span>{btn.icon}</span>
                      <span className="font-medium flex flex-col items-start">
                        <span>{t("download_on")}</span>
                        <span>{btn.label}</span>
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
            <div data-aos="fade-right" className="w-40 h-full">
              <Image
                imageUrl="/images/mobileIsolated.png"
                alt="bannerMobile"
                className="w-full h-full"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MobileAppBanner;
