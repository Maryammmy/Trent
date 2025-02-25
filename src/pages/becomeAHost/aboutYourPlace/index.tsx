import { useTranslation } from "react-i18next";
import home from "../../../assets/iamges/ownProperty.avif";
import Image from "../../../components/ui/Image";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
function AboutYourPlace() {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-xl mx-auto px-5 xl:px-0 pb-10">
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
          <div className="flex flex-col gap-8 flex-1">
            <h4 className="font-medium xl:text-xl">{t("step_1")}</h4>
            <h2 className="text-3xl xl:text-4xl font-bold">
              {t("about_your_place")}
            </h2>
            <p className="xl:text-lg text-dark font-medium">
              {t("about_your_place_desc")}
            </p>
          </div>
          <div className="w-full lg:w-1/2 h-[500px] flex-1 rounded-md overflow-hidden">
            <Image
              imageUrl={home}
              alt="home"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["0px", "0px", "0px"]} />
      <BackAndNext back="/become-a-host" next="/become-a-host/property-type" />
    </div>
  );
}

export default AboutYourPlace;
