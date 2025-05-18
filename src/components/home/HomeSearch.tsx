import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import Input from "../ui/Input";

function HomeSearch() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 w-[250px] md:w-[500px] rounded-full p-3 border shadow hover:shadow-lg bg-white">
      <Input
        type="search"
        placeholder={t("where_are_you_going")}
        className="outline-none w-full bg-white"
      />
      <Search className="text-primary" />
    </div>
  );
}

export default HomeSearch;
