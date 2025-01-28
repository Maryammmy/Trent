import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { homeSearch as searchItems } from "../../data";
import Counter from "./Counter";
import Input from "../ui/Input";

function HomeSearch() {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex lg:hidden items-center justify-center gap-2 w-full md:w-[400px] rounded-full py-3 px-5 border shadow hover:shadow-lg">
        <Search />
        <Input
          type="search"
          className="w-full outline-none"
          placeholder={t("placeholder_search")}
        />
      </div>
      <div className="hidden lg:flex items-center justify-around w-[800px] rounded-full py-3 px-5 border shadow hover:shadow-lg">
        {searchItems.map((item, index) => {
          const title = t(item.title);
          const text = t(item.text);
          const borderBottom =
            index === searchItems.length - 1
              ? ""
              : "border-r  rtl:border-l rtl:border-r-0";
          return (
            <div key={index} className={`pe-6 font-medium ${borderBottom} `}>
              <h2>{title}</h2>
              {text === t("add_guests") ? (
                <div className="flex items-center gap-4">
                  <p className="text-secondary">{text}</p>
                  <Counter />
                </div>
              ) : (
                <p className="text-secondary">{text}</p>
              )}
            </div>
          );
        })}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
          <Search strokeWidth={2.75} size={15} className="text-white" />
        </div>
      </div>
    </>
  );
}

export default HomeSearch;
