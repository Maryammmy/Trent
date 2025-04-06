import { useTranslation } from "react-i18next";
import { preferencesData } from "../../../data/accountSettings/preferences";
import Button from "../../ui/Button";

function PreferencesData() {
  const { t } = useTranslation();
  return (
    <div className="flex-[2]">
      {preferencesData.map((item, index) => {
        const { label, text, button } = item;
        return (
          <div key={index} className="border-b pb-8 pt-4 flex justify-between">
            <div>
              <h2 className="font-bold">{t(label)}</h2>
              <p className=" text-secondary text-lg">{t(text)}</p>
            </div>
            <div>
              <Button className="text-primary text-xl font-medium">
                <span>{t(button)}</span>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PreferencesData;
