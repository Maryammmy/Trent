import { useTranslation } from "react-i18next";
import home from "../../../assets/iamges/ownProperty.avif";
import Image from "../../../components/ui/Image";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
function FinishSetup() {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-xl mx-auto px-5 xl:px-0 pb-10">
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
          <div className="flex flex-col gap-8 flex-1">
            <h4 className="font-medium xl:text-xl">{t("step_3")}</h4>
            <h2 className="text-3xl xl:text-4xl font-bold">
              {t("finish_setup")}
            </h2>
            <p className="xl:text-lg text-dark font-medium">
              {t("finish_setup_desc")}
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
      <ProgressBarsWrapper progressBarsData={["100%", "100%", "0px"]} />
      <BackAndNext
        back="/become-a-host/address-and-floor"
        next="/become-a-host/min-max-days"
      />
    </div>
  );
}

export default FinishSetup;
