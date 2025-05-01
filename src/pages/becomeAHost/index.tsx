import { Link } from "react-router-dom";
import PrograssBar from "../../components/ui/PrograssBar";
import { getStartedToHost } from "../../data/becomeAHost";
import { useTranslation } from "react-i18next";
import { useUserAPI } from "@/services/userService";
import { IUser } from "@/interfaces/accountSettings";
import { useEffect } from "react";
import Cookies from "js-cookie";

function GetStartedToHost() {
  const { t } = useTranslation();
  const { data } = useUserAPI();
  const user: IUser = data?.data?.data?.user_data;
  useEffect(() => {
    if (user) {
      Cookies.set("owner_fees", user.owner_fees_percent);
    }
  }, [user]);
  return (
    <div className="py-10">
      <div className="flex flex-col lg:flex-row gap-10 items-center lg:justify-between hosting-layout max-w-screen-lg mx-auto px-5 md:px-0 lg:px-20 xl:px-0 pb-10">
        <div>
          <h2 className="text-2xl xl:text-4xl font-bold max-w-2xl">
            {t("get_started_to_host")}
          </h2>
        </div>
        <div>
          {getStartedToHost.map((item, index) => {
            const { title, desc } = item;
            const translatedTitle = t(title);
            const translatedDesc = t(desc);
            return (
              <div key={index} className="flex gap-3 pb-10">
                <div>
                  <span className="xl:text-2xl font-semibold">{index + 1}</span>
                </div>
                <div>
                  <h2 className="xl:text-2xl font-semibold">
                    {translatedTitle}
                  </h2>
                  <p className="text-dark font-medium xl:text-lg max-w-lg">
                    {translatedDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <PrograssBar width="0px" />
      <div className="flex justify-end">
        <Link
          to="/become-a-host/about-your-place"
          className="py-2 px-5 font-medium bg-primary text-white text-lg rounded-md mt-4 me-5 xl:me-20"
        >
          <span>{t("get_started")}</span>
        </Link>
      </div>
    </div>
  );
}

export default GetStartedToHost;
