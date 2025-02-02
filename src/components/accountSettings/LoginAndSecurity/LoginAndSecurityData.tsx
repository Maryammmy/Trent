import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";

function LoginAndSecurityData() {
  const { t } = useTranslation();
  return (
    <div className="flex-[2]">
      <div>
        <h2 className="text-stone-700 font-bold text-2xl border-b pb-6">
          {t("login")}
        </h2>
      </div>
      <div className="border-b pb-8 pt-4 flex justify-between">
        <div>
          <h2 className="font-bold">{t("password")}</h2>
          <p className=" text-secondary text-lg">
            {t("last_updated_password")}
          </p>
        </div>
        <div>
          <Button className="text-primary text-xl font-medium">
            <span>{t("edit")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginAndSecurityData;
