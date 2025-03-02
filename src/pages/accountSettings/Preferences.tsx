import PreferencesData from "../../components/accountSettings/preferences/PreferencesData";
import DynamicTitle from "../../components/accountSettings/DynamicTitle";
import { useTranslation } from "react-i18next";
import PreferencesCard from "../../components/accountSettings/preferences/PreferencesCard";

function Preferences() {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl  mx-auto py-5 md:py-10 px-5 xl:px-0">
      <DynamicTitle title={t("global_preferences")} />
      <div className="flex flex-col lg:flex-row lg:items-center gap-10 xl:gap-20 py-5 lg:py-10">
        <PreferencesData />
        <PreferencesCard />
      </div>
    </div>
  );
}

export default Preferences;
