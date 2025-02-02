import { SlidersVertical } from "lucide-react";
import { useTranslation } from "react-i18next";

function PreferencesCard() {
  const { t } = useTranslation();
  return (
    <div className="flex-1">
      <div className=" border p-6 max-w-[400px]">
        <div className="flex flex-col gap-3 p-4">
          <div>
            <SlidersVertical size={40} />
          </div>
          <h2 className="font-bold text-xl">{t("your_global_preferences")}</h2>
          <p className="text-secondary font-medium">
            {t("global_preferences_card_desc")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PreferencesCard;
