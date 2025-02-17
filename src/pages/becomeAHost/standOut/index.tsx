import { useTranslation } from "react-i18next";
import home from "../../../assets/iamges/ownProperty.avif";
import Image from "../../../components/ui/Image";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
function StandOut() {
  const { t } = useTranslation();
  const isRoom = sessionStorage.getItem("selectedTypeOfPlace") === "room";
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-xl mx-auto px-5 xl:px-0 pb-10">
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
          <div className="flex flex-col gap-8 flex-1">
            <h4 className="font-medium xl:text-xl">{t("step_2")}</h4>
            <h2 className="text-3xl xl:text-4xl font-bold">{t("stand_out")}</h2>
            <p className="xl:text-lg text-dark font-medium">
              {t("stand_out_desc")}
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
      <ProgressBarsWrapper progressBarsData={["100%", "0px", "0px"]} />
      <BackAndNext
        back={isRoom ? "/become-a-host/occupancy" : "/become-a-host/floor-plan"}
        next="/become-a-host/amenities"
      />
    </div>
  );
}

export default StandOut;
