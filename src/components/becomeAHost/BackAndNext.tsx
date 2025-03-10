import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useAppDispatch } from "../../store/hooks";
import {
  addCompletedStep,
  setIsFinishUpModal,
} from "../../store/features/becomeAHost/becomeAHostSlice";
import Loader from "../loader/Loader";
import { useSendDataToAPI } from "../../services/addPropertyService";

interface IProps {
  back: string;
  next: string;
  isNextDisabled?: boolean;
  allowNext?: string;
}

function BackAndNext({
  back,
  next,
  isNextDisabled = false,
  allowNext,
}: IProps) {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { sendDataToAPI } = useSendDataToAPI();

  const handleClick = async () => {
    if (next === "/hosting/properties") {
      setLoading(true);
      const isSuccess = await sendDataToAPI();
      setLoading(false);
      if (isSuccess) {
        dispatch(setIsFinishUpModal(true));
        navigate(next);
      }
    } else {
      dispatch(addCompletedStep(allowNext));
      navigate(next);
    }
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
        disabled={isNextDisabled || loading}
        className="flex items-center text-white bg-primary disabled:bg-gray-100 disabled:text-dark disabled:opacity-60 py-2 px-8 rounded-md font-medium text-lg disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader borderColor="#828282" />
        ) : (
          <span>
            {pathname === "/become-a-host/legal-and-create"
              ? t("create_listing")
              : t("next")}
          </span>
        )}
      </Button>
    </div>
  );
}

export default BackAndNext;
