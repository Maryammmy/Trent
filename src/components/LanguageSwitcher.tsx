import { useTranslation } from "react-i18next";
import { languageOptions } from "../data";
import Button from "./ui/Button";

interface IProps {
  isLangSwitcherOpen: boolean;
  close: () => void;
}
const LanguageSwitcher = ({ isLangSwitcherOpen, close }: IProps) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    close();
  };

  return (
    <>
      {isLangSwitcherOpen && (
        <div
          className={`z-50 fixed md:top-16 lg:top-24 xl:top-20 mt-2 w-20 bg-white border border-gray-300 rounded-lg shadow-lg ${
            document.documentElement.dir === "rtl"
              ? "left-2 xl:left-36"
              : "right-2 xl:right-36"
          }`}
        >
          <ul>
            {languageOptions.map((item, index) => {
              const { label, value } = item;
              return (
                <li key={index}>
                  <Button
                    onClick={() => changeLanguage(value)}
                    className="block px-4 py-2 text-left hover:bg-[#F7F7F7]"
                  >
                    {label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default LanguageSwitcher;
