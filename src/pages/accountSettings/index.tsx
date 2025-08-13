import { Link } from "react-router-dom";
import AccountSettingsCard from "../../components/accountSettings/AccountSettingsCard";
import { accountSettingsData } from "../../data/accountSettings";
import { useTranslation } from "react-i18next";
import { useUserAPI } from "../../services/userService";
import { IUser } from "../../interfaces/accountSettings";
import SelectSkeleton from "../../components/skeleton/SelectSkeleton";

function AccountSettings() {
  const { t } = useTranslation();
  const { data } = useUserAPI();
  const user: IUser = data?.data?.data?.user_data;
  return (
    <div className="max-w-6xl mx-auto py-5 md:py-10 px-5 xl:px-0">
      <div>
        <h2 className="text-4xl font-semibold">Account</h2>
        <div className="flex flex-col md:flex-row gap-2 md:items-center pt-4 pb-10">
          {!user ? (
            <div className="md:w-1/5">
              <SelectSkeleton />
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1">
              <span className="font-medium text-xl">{user?.full_name},</span>
              <p className="text-xl wrap-break-anywhere">{user?.email}</p>
            </div>
          )}
          <Link
            to="/account-settings/personal-info"
            className=" underline font-medium text-xl"
          >
            {t("go_to_profile")}
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accountSettingsData.map((item, index) => (
          <AccountSettingsCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default AccountSettings;
