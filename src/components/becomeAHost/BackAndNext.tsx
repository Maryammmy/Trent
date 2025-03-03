import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useAppDispatch } from "../../store/hooks";
import {
  addCompletedStep,
  setIsFinishUpModal,
} from "../../store/features/becomeAHost/becomeAHostSlice";
import { openDB } from "idb";

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
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    const getVideoFromIndexedDB = async () => {
      try {
        const db = await openDB("videoDB", 1);
        const tx = db.transaction("videos", "readonly");
        const store = tx.objectStore("videos");
        const storedVideo = await store.get("uploadedVideo");
        await tx.done;
        if (storedVideo) {
          setVideo(storedVideo);
        }
      } catch (error) {
        console.error("❌ Error retrieving video:", error);
      }
    };
    getVideoFromIndexedDB();
  }, []);
  console.log(video);
  const handleClick = async () => {
    if (next === "/hosting/properties") {
      dispatch(setIsFinishUpModal(true));
    }
    dispatch(addCompletedStep(allowNext));
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
        className="text-white bg-primary disabled:bg-gray-100 disabled:text-dark disabled:opacity-60 py-2 px-8 rounded-md font-medium text-lg disabled:cursor-not-allowed"
      >
        {pathname === "/become-a-host/legal-and-create"
          ? t("create_listing")
          : t("next")}
      </Button>
    </div>
  );
}

export default BackAndNext;
