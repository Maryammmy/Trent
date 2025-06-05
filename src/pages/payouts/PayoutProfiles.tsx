import PayoutProfile from "@/components/payout/payoutProfile/PayoutProfile";
import PropertyHostingSkeleton from "@/components/skeleton/PropertyHostingSkeleton";
import { IPayoutProfile } from "@/interfaces/payouts";
import { usePayoutProfilesAPI } from "@/services/payoutsService";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function PayoutProfiles() {
  const { t } = useTranslation();
  const { data } = usePayoutProfilesAPI();
  const payoutProfiles: IPayoutProfile[] =
    data?.data?.data?.payout_profiles_list;
  return (
    <div className="max-w-6xl py-5 md:py-10 px-5 xl:px-0 mx-auto">
      {payoutProfiles && payoutProfiles?.length > 0 ? (
        <div className="flex items-center justify-between gap-10 mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {t("payout_profiles")}
          </h2>
          <Link
            to="/hosting/payouts/create-profile"
            className="w-8 h-8 rounded-full bg-primary flex justify-center items-center"
          >
            <Plus className="text-white" />
          </Link>
        </div>
      ) : (
        <h2 className="text-3xl font-semibold mb-6">{t("payout_profiles")}</h2>
      )}
      <div className="grid grid-cols-1 gap-5 sm:gap-8 mt-5">
        {!payoutProfiles ? (
          <PropertyHostingSkeleton cards={3} />
        ) : payoutProfiles?.length ? (
          payoutProfiles?.map((profile) => (
            <PayoutProfile key={profile?.id} profile={profile} />
          ))
        ) : (
          <div className="flex flex-col gap-5 justify-center items-center h-[50vh] font-medium w-full">
            <p className="text-lg text-dark">{t("no_payout_profiles_found")}</p>
            <Link
              to="/hosting/payouts/create-profile"
              className="bg-primary font-medium text-white py-2 px-4 rounded-md"
            >
              {t("create_payout_profile")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default PayoutProfiles;
