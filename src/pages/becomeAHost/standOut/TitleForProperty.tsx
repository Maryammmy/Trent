import { useTranslation } from "react-i18next";
import { useState } from "react";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Input from "../../../components/ui/Input";

function TitleForProperty() {
  const [titleInput, setTitleInput] = useState<string>("");
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
        <Input
          maxLength={100}
          minLength={5}
          onChange={(e) => setTitleInput(e.target.value)}
          name="title"
          value={titleInput}
          placeholder={t("title_for_property_placeholder")}
          className="outline-none bg-zinc-50 border border-secondary py-3 px-2 rounded-md focus:border-primary"
        />
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "60%", "0px"]} />
      <BackAndNext
        back="/become-a-host/photos"
        next="/become-a-host/description"
        isNextDisabled={titleInput.length < 5}
      />
    </div>
  );
}

export default TitleForProperty;
