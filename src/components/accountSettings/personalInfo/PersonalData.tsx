import { useTranslation } from "react-i18next";
import { personalInfoData } from "../../../data/accountSettingsData/personalInfoData";
import Button from "../../ui/Button";

function PersonalData() {
  const { t } = useTranslation();
  return (
    <div className="flex-[2]">
      {personalInfoData.map((item, index) => {
        const { label, text, button } = item;
        return (
          <div key={index} className="border-b pb-8 pt-4 flex justify-between">
            <div>
              <h2 className="font-bold">{t(label)}</h2>
              <p className=" text-secondary">{text}</p>
            </div>
            <div>
              <Button className="underline font-medium">
                <span>{t(button)}</span>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PersonalData;
