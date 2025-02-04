import { useTranslation } from "react-i18next";
import BackAndNext from "../../../components/hosting/BackAndNext";
import ProgressBarsWrapper from "../../../components/hosting/ProgressBarsWrapper";
import TextArea from "../../../components/ui/TextArea";
import { useState } from "react";

function TitleForProperty() {
  const [titletextArea, setTitletextArea] = useState<string>("");
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("title_for_property")}
        </h3>
        <p className="max-w-2xl text-secondary font-medium pb-10">
          {t("title_for_property_desc")}
        </p>
        <TextArea
          onChange={(e) => setTitletextArea(e.target.value)}
          name="title"
          value={titletextArea}
          placeholder={t("title_for_property_placeholder")}
          className="outline-none bg-zinc-50 border border-secondary py-3 px-2 rounded-md focus:border-primary"
          rows={6}
        ></TextArea>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "60%", "0px"]} />
      <BackAndNext
        back="/hosting/photos"
        next="/hosting/description"
        isNextDisabled={titletextArea.length < 5}
      />
    </div>
  );
}

export default TitleForProperty;
