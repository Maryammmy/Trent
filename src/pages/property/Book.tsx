import Loader from "@/components/loader/Loader";
import CheckDates from "@/components/property/CheckDates";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";
import { ApiError } from "@/interfaces";
import {
  usePropertyDatesAPI,
  usePropertyInfoAPI,
  verifyPropertyAPI,
} from "@/services/bookingService";
import { CurrentLanguage } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { validateStartDate, validateEndDate } from "@/utils/handleChangeDate";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { DateValueType } from "react-tailwindcss-datepicker";
import Cookies from "js-cookie";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import Input from "@/components/ui/Input";
import BookingSkeleton from "@/components/skeleton/BookingSkeleton";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const uid = Cookies.get("user_id");

function Book() {
  const [counter, setCounter] = useState(1);
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [startDateValue, setStartDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [endDateValue, setEndDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { data } = usePropertyInfoAPI(id);
  const propertyBook = data?.data?.data?.property_booking_details;
  const fromDate = formatDate(startDateValue?.startDate);
  const toDate = formatDate(endDateValue?.startDate);
  const minDays = Number(propertyBook?.min_days);
  const { data: datesData } = usePropertyDatesAPI(id);
  const dates = datesData?.data?.data?.date_list;
  const handleStartValueChange = (newValue: DateValueType) => {
    const validatedValue = validateStartDate(newValue, endDateValue, t);
    if (validatedValue) {
      setStartDateValue(validatedValue);
      setErrors((prevErrors) => ({ ...prevErrors, checkin: "" }));
    }
  };
  const handleEndValueChange = (newValue: DateValueType) => {
    const validatedValue = validateEndDate(
      newValue,
      startDateValue,
      t,
      Number(propertyBook?.min_days),
      Number(propertyBook?.max_days)
    );
    if (validatedValue) {
      setEndDateValue(validatedValue);
      setErrors((prevErrors) => ({ ...prevErrors, checkout: "" }));
    }
  };
  const updateCounter = (value: number) => {
    setCounter((prevCounter) => prevCounter + value);
  };
  const handleRulesChange = () => {
    const newRules = !acceptedRules;
    setAcceptedRules(newRules);
    if (newRules) {
      setErrors((prevErrors) => ({ ...prevErrors, rules: "" }));
    }
  };

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    if (!startDateValue?.startDate) {
      newErrors.checkin = t("please_select_checkin_date");
    }
    if (!endDateValue?.startDate) {
      newErrors.checkout = t("please_select_checkout_date");
    }
    if (!acceptedRules) {
      newErrors.rules = t("please_accept_host_rules");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyProperty = async () => {
    try {
      if (!validateInputs()) {
        return;
      }
      setLoading(true);
      const payload = {
        prop_id: id ? id : "",
        guest_counts: counter,
        from_date: fromDate,
        to_date: toDate,
        confirm_guest_rules: acceptedRules,
        uid: uid ? uid : "",
        lang: currentLanguage,
      };
      const response = await verifyPropertyAPI(payload);
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        console.log(response?.data?.data?.booking_details);
        sessionStorage.setItem(
          "bookingData",
          JSON.stringify({
            ...response?.data?.data?.booking_details,
            confirm_guest_rules: acceptedRules,
          })
        );
        setTimeout(() => {
          navigate(`/properties/${id}/confirm-and-pay`, {
            state: {
              data: {
                ...response?.data?.data?.booking_details,
                confirm_guest_rules: acceptedRules,
              },
            },
          });
        }, 500);
      }
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!propertyBook ? (
        <BookingSkeleton cards={2} />
      ) : (
        <div className="py-10 px-5 xl:px-20 mx-auto max-w-screen-xl">
          <div className="pb-5">
            <h2 className="font-bold text-2xl">{propertyBook?.title}</h2>
            {minDays ? (
              <p className="font-medium text-dark pt-2">
                {t("minimum_stay_desc", { days: minDays })}{" "}
                {minDays > 1 ? t("days") : t("day")}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-10">
            <CheckDates
              startDateValue={startDateValue}
              endDateValue={endDateValue}
              handleStartValueChange={handleStartValueChange}
              handleEndValueChange={handleEndValueChange}
              errors={{ checkin: errors.checkin, checkout: errors.checkout }}
              reservedDates={dates}
            />
            <div className="flex flex-col">
              <h2 className="text-black font-bold mb-2">{t("guest_count")}</h2>
              <div className="flex items-center gap-4">
                <p className="text-dark font-medium">
                  {propertyBook?.guest_count
                    ? t("suitable_guests", {
                        guests: propertyBook?.guest_count,
                      })
                    : t("open_number_guests")}
                </p>
                <Counter
                  counter={counter}
                  increaseCounter={() => updateCounter(1)}
                  decreaseCounter={() => updateCounter(-1)}
                  maxNumber={Number(propertyBook?.guest_count)}
                  bookGuestCount={1}
                />
              </div>
            </div>
            {propertyBook?.guest_rules && (
              <div className="flex flex-col">
                <h3 className="font-bold mb-2">{t("host_rules")}</h3>
                <p className="text-dark font-medium">
                  {propertyBook?.guest_rules}
                </p>
                <div className="flex items-center gap-2 font-medium pt-2">
                  <Input
                    type="checkbox"
                    id="rules"
                    checked={acceptedRules}
                    onChange={handleRulesChange}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                  <label htmlFor="rules" className="text-dark">
                    {t("i_accept_host_rules")}
                  </label>
                </div>
                {errors.rules && <InputErrorMessage msg={errors.rules} />}
              </div>
            )}
          </div>
          <div className="flex justify-end py-10">
            <Button
              disabled={loading}
              onClick={handleVerifyProperty}
              className="bg-primary text-white w-32 py-2 rounded-md text-lg font-medium"
            >
              {loading ? <Loader /> : t("continue")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Book;
