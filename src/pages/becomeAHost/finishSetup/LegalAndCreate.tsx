import { useTranslation } from "react-i18next";
import Input from "../../../components/ui/Input";
import {
  howAreYouhosting,
  LegalSafetyDetails,
} from "../../../data/becomeAHost";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";

function LegalAndCreate() {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("share_safety_details")}
        </h3>
        <div className="pb-10">
          <h4 className="text-xl font-bold py-5">
            {t("how_are_you_hosting_on_Trent")}
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {howAreYouhosting.map((title, index) => (
              <div key={index} className="flex gap-4 items-center">
                <Input type="radio" className="w-6 h-6 accent-primary" />
                <h4 className="text-lg font-medium">{t(title)}</h4>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xl font-bold py-5">
            {t("does_your_place_have_any_of_these")}
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {LegalSafetyDetails.map((title, index) => (
              <div key={index} className="flex gap-4 items-center">
                <Input type="checkbox" className="w-6 h-6 accent-primary" />
                <h4 className="text-lg font-medium">{t(title)}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProgressBarsWrapper progressBarsData={["100%", "100%", "82%"]} />
      <BackAndNext back="/become-a-host/discount" next="/hosting/listings" />
    </div>
  );
}

export default LegalAndCreate;
