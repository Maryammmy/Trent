import PayoutReadyProperty from "@/components/payout/PayoutReadyProperty";
import { useTranslation } from "react-i18next";
import Image from "@/components/ui/Image";
import { CurrentLanguage } from "@/types";
import Button from "@/components/ui/Button";
import { useState } from "react";
import {
  createPayoutsRequestAPI,
  usePayoutProfilesAPI,
  usePayoutPropertiesAPI,
} from "@/services/payoutsService";
import Select from "@/components/ui/Select";
import PropertyHostingSkeleton from "@/components/skeleton/PropertyHostingSkeleton";
import { IPayoutProfile, IReadyPayoutProperties } from "@/interfaces/payouts";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { ApiError } from "@/interfaces";
import Loader from "@/components/loader/Loader";
import { useNavigate } from "react-router-dom";
import SelectSkeleton from "@/components/skeleton/SelectSkeleton";

const uid = Cookies.get("user_id") || "";
const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
function PayoutRequest() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [profileId, setProfileId] = useState<string>("");
  const { data: payoutProfileData } = usePayoutProfilesAPI();
  const payoutProfiles: IPayoutProfile[] =
    payoutProfileData?.data?.data?.payout_profiles_list;
  const { data } = usePayoutPropertiesAPI();
  const payoutProperties: IReadyPayoutProperties[] =
    data?.data?.data?.Properties_list;
  const toggleProperty = (id: number) => {
    setSelectedProperties((prev) =>
      prev.includes(id) ? prev.filter((propId) => propId !== id) : [...prev, id]
    );
  };
  const sendPayoutRequest = async () => {
    try {
      if (!profileId && !selectedProperties?.length) {
        toast.error(t("please_select_profile_and_properties"));
        return;
      }
      setLoading(true);
      const payload = {
        profile_id: profileId,
        lang: currentLanguage,
        booking_list: JSON.stringify(selectedProperties),
        uid,
      };
      const response = await createPayoutsRequestAPI(payload);
      if (response?.data?.response_code === 201) {
        toast.success(response?.data?.response_message);
        setTimeout(() => {
          navigate("/hosting/payouts");
        }, 1000);
      }
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {!payoutProperties ? (
        <div className="py-10 px-5 xl:px-0 max-w-6xl mx-auto space-y-8">
          <PropertyHostingSkeleton cards={5} />
        </div>
      ) : (
        <div className="py-10 px-5 xl:px-0 max-w-6xl mx-auto">
          <div className="w-full sm:w-96 h-52 relative rounded-2xl overflow-hidden">
            <div className="absolute h-full left-5 py-2 pointer-events-none z-[5] flex flex-col justify-between">
              <h2 className="text-white font-semibold text-xl pt-5">
                {t("payouts")}
              </h2>
              <div className="flex flex-col gap-1">
                <span className="text-white font-semibold text-2xl">
                  1200 {t("EGP")}
                </span>
                <span className="text-white font-semibold text-lg">
                  {t("your_total_earnings")}
                </span>
              </div>
            </div>
            <div className="w-full h-full">
              <Image
                imageUrl={
                  currentLanguage === "ar"
                    ? "/images/walletIMageAr.png"
                    : "/images/walletIMage.png"
                }
                alt="card"
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="pt-8 max-w-md">
            {!payoutProfiles ? (
              <SelectSkeleton />
            ) : payoutProfiles?.length ? (
              <Select
                options={payoutProfiles?.map((profile: IPayoutProfile) => ({
                  value: profile?.id,
                  label: profile?.method_name,
                }))}
                value={profileId}
                onChange={(e) => setProfileId(e.target.value)}
              />
            ) : (
              <div className="flex flex-col gap-5 justify-center items-center font-medium">
                <p className="text-lg text-dark">
                  {t("no_payout_profiles_found")}
                </p>
                <Button
                  onClick={() =>
                    navigate("/hosting/payouts/create-profile", {
                      state: "/hosting/payouts/request",
                    })
                  }
                  className="bg-primary font-medium text-white py-2 px-4 rounded-md"
                >
                  {t("create_payout_profile")}
                </Button>
              </div>
            )}
          </div>
          <div className="pt-8">
            <h2 className="text-2xl font-semibold">{t("ready_properties")}</h2>
            <div className="grid grid-cols-1 gap-5 sm:gap-8 mt-5">
              {!payoutProperties ? (
                <PropertyHostingSkeleton cards={3} />
              ) : payoutProperties?.length ? (
                payoutProperties?.map((property) => (
                  <PayoutReadyProperty
                    key={property?.id}
                    property={property}
                    isSelected={selectedProperties.includes(
                      Number(property?.id)
                    )}
                    onToggle={toggleProperty}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center text-lg h-[50vh] text-dark font-medium w-full">
                  {t("no_ready_properties_found")}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end pt-10">
            <Button
              disabled={loading}
              onClick={sendPayoutRequest}
              className=" bg-primary text-white py-3 w-44 text-lg rounded-md font-medium"
            >
              {loading ? <Loader /> : t("payout_request")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default PayoutRequest;
