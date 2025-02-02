import { useTranslation } from "react-i18next";
import DynamicTitle from "../../components/accountSettings/DynamicTitle";
import PersonalCard from "../../components/accountSettings/personalInfo/PersonalCard";
import PersonalData from "../../components/accountSettings/personalInfo/PersonalData";

function PersonalInfo() {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl  mx-auto py-5 md:py-10 px-5 xl:px-0">
      <DynamicTitle title={t("personal_info")} />
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-20 py-5 lg:py-10">
        <PersonalData />
        <PersonalCard />
      </div>
    </div>
  );
}

export default PersonalInfo;
