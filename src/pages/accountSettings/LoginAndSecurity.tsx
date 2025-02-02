import { useTranslation } from "react-i18next";
import DynamicTitle from "../../components/accountSettings/DynamicTitle";
import LoginAndSecurityCard from "../../components/accountSettings/LoginAndSecurity/LoginAndSecurityCard";
import LoginAndSecurityData from "../../components/accountSettings/LoginAndSecurity/LoginAndSecurityData";

function LoginAndSecurity() {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl  mx-auto py-5 md:py-10 px-5 xl:px-0">
      <DynamicTitle title={t("login_and_security")} />
      <div className="flex flex-col lg:flex-row lg:items-center gap-10 xl:gap-20 py-5 lg:py-10">
        <LoginAndSecurityData />
        <LoginAndSecurityCard />
      </div>
    </div>
  );
}

export default LoginAndSecurity;
