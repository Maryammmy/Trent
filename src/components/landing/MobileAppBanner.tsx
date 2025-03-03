import { useEffect, useState } from "react";
import banner from "../../assets/iamges/mobileIsolated.png";
import { buttonData } from "../../data/landingData";
import Button from "../ui/Button";
import Image from "../ui/Image";
import { useMediaQuery } from "react-responsive";

function MobileAppBanner() {
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
            <h2 className="text-white text-lg md:text-3xl font-semibold max-w-md">
              Get our Mobile App for a better experience!
            </h2>
            <div className="w-40 h-full">
              <Image
                imageUrl={banner}
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
                  <Button
                    key={i}
                    className="bg-black text-white rounded-md w-52 p-2 flex items-center gap-2"
                  >
                    <span>{btn.icon}</span>
                    <span className="font-medium flex flex-col items-start">
                      <span>Download on the</span>
                      <span>{btn.label}</span>
                    </span>
                  </Button>
                ))}
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="flex flex-col gap-5">
              <h2 className="text-white text-lg md:text-3xl font-semibold max-w-md">
                Get our Mobile App for a better experience!
              </h2>
              <div className="flex flex-col items-center md:flex-row gap-10">
                {buttonData
                  .filter(
                    (btn) => btn.platform === platform || platform === "desktop"
                  )
                  .map((btn, i) => (
                    <Button
                      key={i}
                      className="bg-black text-white rounded-md w-52 p-2 flex items-center gap-2"
                    >
                      <span>{btn.icon}</span>
                      <span className="font-medium flex flex-col items-start">
                        <span>Download on the</span>
                        <span>{btn.label}</span>
                      </span>
                    </Button>
                  ))}
              </div>
            </div>
            <div className="w-40 h-full">
              <Image
                imageUrl={banner}
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
