import { useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useWarnBeforeUnload = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasUploadedImages = sessionStorage.getItem("hasUploadedImages");
      const hasUploadedVideo = sessionStorage.getItem("hasUploadedVideo");
      if (hasUploadedImages === "true" || hasUploadedVideo === "true") {
        event.preventDefault();
        event.returnValue = "";
        toast.error(t("refresh_error"), {
          duration: 5000,
        });
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [t]);
};

export default useWarnBeforeUnload;
