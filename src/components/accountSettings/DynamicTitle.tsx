import { useTranslation } from "react-i18next";

interface IProps {
  title: string;
}
function DynamicTitle({ title }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3">
      {/* <div className="flex items-center gap-4">
        <Link
          to="/account-settings"
          className="text-stone-700 font-semibold text-lg"
        >
          {t("account")}
        </Link>
        <ChevronRight className="text-dark" size={20} />
        <h2 className="text-stone-700 font-semibold text-lg">{title}</h2>
      </div> */}
      <h2 className="text-stone-700 text-2xl md:text-4xl font-bold">
        {t(title)}
      </h2>
    </div>
  );
}

export default DynamicTitle;
