import PayoutProfile from "@/components/payout/payoutProfile/PayoutProfile";
import PropertyHostingSkeleton from "@/components/skeleton/PropertyHostingSkeleton";
import { IPayoutProfile } from "@/interfaces/payouts";
import { usePayoutProfilesAPI } from "@/services/payoutsService";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function PayoutProfiles() {
  const { t } = useTranslation();
  const { data } = usePayoutProfilesAPI();
  const payoutProfiles: IPayoutProfile[] =
    data?.data?.data?.payout_profiles_list;
  return (
    <div className="max-w-6xl py-5 md:py-10 px-5 xl:px-0 mx-auto">
      <h2 className="text-3xl font-semibold mb-6">{t("payout_profiles")}</h2>
      <div className="grid grid-cols-1 gap-5 sm:gap-8 mt-5">
        {!payoutProfiles ? (
          <PropertyHostingSkeleton cards={3} />
        ) : payoutProfiles?.length ? (
          payoutProfiles.map((profile) => (
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
