import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

interface IProps {
  back: string;
  next: string;
  isNextDisabled?: boolean;
}

function BackAndNext({ back, next, isNextDisabled = false }: IProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(next);
  };
  return (
    <div className="flex items-center justify-between px-5 xl:px-20 pt-5">
      <Link
        to={back}
        className="font-medium underline py-2 px-4 rounded-md text-lg text-primary hover:bg-gray-100"
      >
        <span>{t("back")}</span>
      </Link>
      <Button
        onClick={handleClick}
        disabled={isNextDisabled}
        className=" text-white bg-primary disabled:bg-gray-100 disabled:text-secondary disabled:opacity-60 py-2 px-8 rounded-md font-medium text-lg disabled:cursor-not-allowed"
      >
        {t("next")}
      </Button>
    </div>
  );
}

export default BackAndNext;
