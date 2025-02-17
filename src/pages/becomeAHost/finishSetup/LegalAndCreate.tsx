import { useTranslation } from "react-i18next";
import { useState } from "react";
import Input from "../../../components/ui/Input";
import {
  howAreYouhosting,
  LegalSafetyDetails,
} from "../../../data/becomeAHost";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";

const storedHostingType = sessionStorage.getItem("hostingType");
const storedSafetyDetails = sessionStorage.getItem("safetyDetails");
function LegalAndCreate() {
  const { t } = useTranslation();
  const [selectedHosting, setSelectedHosting] = useState<string>(
    storedHostingType || ""
  );
  const [selectedSafety, setSelectedSafety] = useState<string[]>(
    storedSafetyDetails ? JSON.parse(storedSafetyDetails) : []
  );

  const handleHostingChange = (title: string) => {
    setSelectedHosting(title);
    sessionStorage.setItem("hostingType", title);
  };

  const handleSafetyChange = (title: string) => {
    let updatedSafety = [...selectedSafety];
    if (updatedSafety.includes(title)) {
      updatedSafety = updatedSafety.filter((item) => item !== title);
    } else {
      updatedSafety.push(title);
    }

    setSelectedSafety(updatedSafety);
    sessionStorage.setItem("safetyDetails", JSON.stringify(updatedSafety));
  };

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
                <Input
                  type="radio"
                  className="w-6 h-6 accent-primary"
                  checked={selectedHosting === title}
                  onChange={() => handleHostingChange(title)}
                />
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
                <Input
                  type="checkbox"
                  className="w-6 h-6 accent-primary"
                  checked={selectedSafety.includes(title)}
                  onChange={() => handleSafetyChange(title)}
                />
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
