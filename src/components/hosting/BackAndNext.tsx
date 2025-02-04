import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface IProps {
  back: string;
  next: string;
}
function BackAndNext({ back, next }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between px-5 xl:px-20 pt-5">
      <Link
        to={back}
        className="font-medium underline py-2 px-4 rounded-md text-lg text-primary hover:bg-gray-100"
      >
        <span>{t("back")}</span>
      </Link>
      <Link
        to={next}
        className="bg-primary text-white py-2 px-8 rounded-md font-medium text-lg"
      >
        <span>{t("next")}</span>
      </Link>
    </div>
  );
}

export default BackAndNext;
