import { useTranslation } from "react-i18next";

function Payout() {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <div className="mx-auto w-full md:w-[50%] lg:w-[40%] xl:w-[25%] bg-primary h-52 rounded-2xl">
        <h2>{t("payout")}</h2>
      </div>
    </div>
  );
}

export default Payout;
