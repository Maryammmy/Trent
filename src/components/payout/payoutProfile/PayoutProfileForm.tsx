import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Cookies from "js-cookie";
import InputErrorMessage from "../../ui/InputErrorMessage";
import Loader from "../../loader/Loader";
import { ApiError } from "../../../interfaces";
import { PayoutProfileSchema } from "@/validation/payoutProfileSchema";
import { IPaymentMethod, ICreatePayoutsProfile } from "@/interfaces/payouts";
import {
  createPayoutsProfileAPI,
  usePaymentMethodAPI,
} from "@/services/payoutsService";
import Select from "@/components/ui/Select";
import SelectSkeleton from "@/components/skeleton/SelectSkeleton";
import { CurrentLanguage } from "@/types";
import { useLocation, useNavigate } from "react-router-dom";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const uid = Cookies.get("user_id");
function PayoutProfileForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state || "/hosting/payouts/profiles";
  const { data: paymentMethod } = usePaymentMethodAPI();
  const paymentMethods: IPaymentMethod[] =
    paymentMethod?.data?.data?.payout_method_list;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePayoutsProfile>({
    resolver: yupResolver(PayoutProfileSchema),
    defaultValues: {
      uid,
      full_name: "",
      profile_name: "",
      bank_account_number: "",
      bank_name: "",
      wallet_number: "",
      method_id: "",
      lang: currentLanguage,
    },
  });
  const onSubmit = async (data: ICreatePayoutsProfile) => {
    try {
      if (
        !data.wallet_number &&
        (!data.bank_account_number || !data.bank_name)
      ) {
        toast.error(
          "Please fill the number wallet or bank name and account number"
        );
        return;
      }
      setLoading(true);
      const response = await createPayoutsProfileAPI(data);
      if (response?.data?.response_code === 201) {
        toast.success(response?.data?.response_message);
        setTimeout(() => {
          navigate(from);
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
      <div className="py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-2 flex flex-col gap-2">
            <label className="font-bold">{t("profile_name")}</label>
            <Controller
              name="profile_name"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter your profile name"
                  className="w-full p-3 border rounded-md outline-none focus:border-2 focus:border-primary"
                />
              )}
            />
            {errors.profile_name && (
              <InputErrorMessage msg={errors.profile_name.message} />
            )}
          </div>
          <div className="py-2 flex flex-col gap-2">
            <label className="font-bold">{t("formal_full_name")}</label>
            <Controller
              name="full_name"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter your formal full name"
                  className="w-full p-3 border rounded-md outline-none focus:border-2 focus:border-primary"
                />
              )}
            />
            {errors?.full_name && (
              <InputErrorMessage msg={errors?.full_name?.message} />
            )}
          </div>
          <div className="py-2 flex flex-col gap-2">
            <label className="font-bold">{t("payment_method")}</label>
            {!paymentMethods ? (
              <SelectSkeleton />
            ) : paymentMethods?.length ? (
              <Controller
                name="method_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={paymentMethods?.map((payment) => ({
                      value: payment?.id,
                      label: payment?.name,
                    }))}
                    className="border py-3 px-2 bg-white rounded-md focus:border-2 focus:border-primary outline-none"
                  />
                )}
              />
            ) : (
              <p className="border bg-white py-3 px-2 rounded-md">
                No payment method found
              </p>
            )}
            {errors.method_id && (
              <InputErrorMessage msg={errors.method_id.message} />
            )}
          </div>
          <div className="py-2 flex flex-col gap-2">
            <label className="font-bold">{t("bank_name")}</label>
            <Controller
              name="bank_name"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter your bank name"
                  className="w-full p-3 border rounded-md outline-none focus:border-2 focus:border-primary"
                />
              )}
            />
            {errors?.bank_name && (
              <InputErrorMessage msg={errors?.bank_name?.message} />
            )}
          </div>
          <div className="py-2 flex flex-col gap-2">
            <label className="font-bold">{t("bank_account_number")}</label>
            <Controller
              name="bank_account_number"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter your bank account number"
                  className="w-full p-3 border rounded-md outline-none focus:border-2 focus:border-primary"
                />
              )}
            />
            {errors?.bank_account_number && (
              <InputErrorMessage msg={errors?.bank_account_number?.message} />
            )}
          </div>
          <div className="py-2 flex flex-col gap-2">
            <label className="font-bold">{t("wallet_number")}</label>
            <Controller
              name="wallet_number"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter your wallet number"
                  className="w-full p-3 border rounded-md outline-none focus:border-2 focus:border-primary"
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/^0+/, "");
                    field.onChange(value);
                  }}
                />
              )}
            />
            {errors?.wallet_number && (
              <InputErrorMessage msg={errors?.wallet_number?.message} />
            )}
          </div>
          <div className="flex justify-end my-5">
            <Button
              type="submit"
              className="bg-primary text-white font-medium py-3 w-48 rounded-md"
              disabled={loading}
            >
              {loading ? <Loader /> : t("create_payout_profile")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default PayoutProfileForm;
