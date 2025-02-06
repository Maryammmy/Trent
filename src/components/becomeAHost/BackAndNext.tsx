import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useAppDispatch } from "../../store/hooks";
import { setIsFinishUpModal } from "../../store/features/becomeAHost/becomeAHostSlice";

interface IProps {
  back: string;
  next: string;
  isNextDisabled?: boolean;
}

function BackAndNext({ back, next, isNextDisabled = false }: IProps) {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  localStorage.setItem("pathname", back);
  const handleClick = () => {
    if (next === "/hosting/listings") {
      dispatch(setIsFinishUpModal(true));
    }
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
        {pathname === "/become-a-host/legal-and-create"
          ? t("craete_listing")
          : t("next")}
      </Button>
    </div>
  );
}

export default BackAndNext;
