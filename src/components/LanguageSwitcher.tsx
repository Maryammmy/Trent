import { useTranslation } from "react-i18next";
import Button from "./ui/Button";
import { CurrentLanguage } from "@/types";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    window.location.reload();
  };

  return (
    <>
      <div>
        <Button
          onClick={() => changeLanguage(currentLanguage === "en" ? "ar" : "en")}
          className="font-medium flex items-center text-white hover:text-secondary"
        >
          {currentLanguage === "en" ? "AR" : "EN"}
        </Button>
      </div>
    </>
  );
};

export default LanguageSwitcher;
