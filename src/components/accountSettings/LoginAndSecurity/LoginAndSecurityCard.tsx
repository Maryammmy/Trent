import { ShieldQuestion } from "lucide-react";
import { useTranslation } from "react-i18next";

function LoginAndSecurityCard() {
  const { t } = useTranslation();
  return (
    <div className="flex-1">
      <div className=" border p-6 max-w-[400px]">
        <div className="flex flex-col gap-3 p-4">
          <div>
            <ShieldQuestion size={40} />
          </div>
          <h2 className="font-bold text-xl">
            {t("login_and_security_card_title")}
          </h2>
          <p className="text-secondary font-medium">
            {t("login_and_security_card_text")}
          </p>
          <p className="text-secondary font-medium">
            {t("login_and_security_card_text2")}
            <span className="text-primary font-semibold">
              {" "}
              {t("the_guests")}
            </span>
            <span> {t("and")}</span>
            <span className="text-primary font-semibold"> {t("hosts")}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginAndSecurityCard;
