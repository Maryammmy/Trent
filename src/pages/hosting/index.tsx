import HostingCard from "@/components/hosting/HostingCard";
import SelectSkeleton from "@/components/skeleton/SelectSkeleton";
import { hosting } from "@/data/hosting";
import { IUser } from "@/interfaces/accountSettings";
import { useUserAPI } from "@/services/userService";
import { useTranslation } from "react-i18next";

function Hosting() {
  const { t } = useTranslation();
  const { data } = useUserAPI();
  const user: IUser = data?.data?.data?.user_data;

  return (
    <div className="max-w-6xl  mx-auto py-5 md:py-10 px-5 xl:px-0">
      <div className="flex items-center gap-2 pb-10">
        <h2 className="text-xl md:text-4xl font-semibold">{t("membership")}</h2>
        <div className="">
          {!user ? (
            <div className="md:w-1/5">
              <SelectSkeleton />
            </div>
          ) : (
            <span className="font-bold text:lg md:text-2xl text-primary">
              : {user?.membership}
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hosting.map((item, index) => (
          <HostingCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Hosting;
