import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextArea from "../../../components/ui/TextArea";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";

const storedDesc = sessionStorage.getItem("propertyDescription");
function DescriptionForProperty() {
  const [desctextArea, setDesctextArea] = useState<string>(storedDesc || "");
  const { t } = useTranslation();
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setDesctextArea(newValue);
    sessionStorage.setItem("propertyDescription", newValue);
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("desc_for_property")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-10">
          {t("desc_for_property_desc")}
        </p>
        <TextArea
          maxLength={10000}
          minLength={50}
          onChange={handleDescriptionChange}
          name="description"
          value={desctextArea}
          placeholder={t("desc_for_property_placeholder")}
          className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-primary"
          rows={10}
        ></TextArea>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "60%", "0px"]} />
      <BackAndNext
        back="/become-a-host/title"
        next="/become-a-host/finish-setup"
        isNextDisabled={desctextArea.length < 10}
      />
    </div>
  );
}

export default DescriptionForProperty;
