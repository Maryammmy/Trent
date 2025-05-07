import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import { updateUserAPI, useUserAPI } from "../../../services/userService";
import { IUpdateUser, IUser } from "../../../interfaces/accountSettings";
import Select from "../../ui/Select";
import { gender } from "../../../data/accountSettings/personalInfo";
import Image from "../../ui/Image";
import toast from "react-hot-toast";
import { personalDataSchema } from "../../../validation/personalDataSchema";
import Input from "../../ui/Input";
import { convertPersonalDataToFormData } from "../../../utils/convertPersonalDataToFormData";
import Cookies from "js-cookie";
import { allowedImageTypes } from "../../../constants";
import InputErrorMessage from "../../ui/InputErrorMessage";
import Loader from "../../loader/Loader";
import UserSkeleton from "../../skeleton/UserSkeleton";
import { ApiError } from "../../../interfaces";
import { baseURL } from "../../../services";
import ChangeMobileModal from "./ChangeMobileModal";
import CountrySelector from "@/components/ui/CountrySelector";

const uid = Cookies.get("user_id");
function PersonalData() {
  const { t } = useTranslation();
  const [changeMobile, setChangeMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [previewImage, setPreviewImage] = useState<string>("");
  const [imageError, setImageError] = useState<string | null>(null);
  const { data } = useUserAPI();
  const user: IUser = data?.data?.data?.user_data;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUpdateUser>({
    resolver: yupResolver(personalDataSchema),
    defaultValues: {
      full_name: "",
      email: "",
      gender: "",
      pro_img: "",
    },
  });
  useEffect(() => {
    if (user) {
      reset({
        uid,
        full_name: user?.full_name,
        email: user?.email,
        gender: user?.gender,
        pro_img: user?.pro_img,
      });
      setPreviewImage(baseURL + user?.pro_img);
      setPhone(user?.phone);
      setCountryCode(user?.c_code);
    }
  }, [user, reset]);
  const onSubmit = async (data: IUpdateUser) => {
    setImageError(null);
    const formData = convertPersonalDataToFormData(data);
    try {
      setLoading(true);
      const response = await updateUserAPI(formData);
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        // reset();
        window.location.reload();
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
      <div className="flex-[2]">
        {!user ? (
          <UserSkeleton cards={4} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden cursor-pointer">
                <label htmlFor="fileInput">
                  <Image
                    imageUrl={previewImage}
                    className="w-full h-full object-cover"
                    alt="profile"
                  />
                </label>
              </div>
              <Controller
                name="pro_img"
                control={control}
                render={({ field: { onChange } }) => (
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        if (!allowedImageTypes.includes(file.type)) {
                          setImageError(t("invalid_image_format"));
                          return;
                        }
                        toast.success(t("image_uploaded_successfully"));
                        setImageError(null);
                        setPreviewImage(URL.createObjectURL(file));
                        onChange(file);
                      }
                    }}
                  />
                )}
              />
              {errors.pro_img && (
                <InputErrorMessage msg={errors.pro_img.message} />
              )}
              {imageError && <InputErrorMessage msg={imageError} />}
            </div>
            <div className="py-2 flex flex-col gap-2">
              <label className="font-bold">{t("legal_name")}</label>
              <Controller
                name="full_name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter your name"
                    className="w-full p-3 border rounded-md outline-none focus:border-2 focus:border-primary"
                  />
                )}
              />
              {errors.full_name && (
                <InputErrorMessage msg={errors.full_name.message} />
              )}
            </div>
            <div className="py-2 flex flex-col gap-2">
              <label className="font-bold">{t("email")}</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    className="w-full p-3 border rounded-md outline-none focus:border-2 focus:border-primary"
                  />
                )}
              />
              {errors.email && <InputErrorMessage msg={errors.email.message} />}
            </div>
            <div className="py-2 flex flex-col gap-2">
              <label className="font-bold">Phone number</label>
              <div className="flex items-center gap-2 border rounded-lg p-3 focus-within:border-2 focus-within:border-primary">
                <CountrySelector selectedCountry={user?.c_code} readOnly />
                <div className="flex gap-2 justify-between w-full">
                  <Input
                    value={phone}
                    placeholder="Enter your phone number"
                    className="outline-none w-full"
                    readOnly
                  />
                  <Button
                    type="button"
                    onClick={() => setChangeMobile(true)}
                    className="text-primary font-medium"
                  >
                    {t("change")}
                  </Button>
                </div>
              </div>
            </div>
            <div className="py-2 flex flex-col gap-2">
              <label className="font-bold">{t("gender")}</label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={gender}
                    className="w-full p-3 border rounded-md outline-none focus:border-2 focus:border-primary"
                  />
                )}
              />
              {errors.gender && (
                <InputErrorMessage msg={errors.gender.message} />
              )}
            </div>
            <Button
              type="submit"
              className="w-full mt-4 bg-primary text-white font-medium py-3 rounded-lg"
              disabled={loading}
            >
              {loading ? <Loader /> : t("update")}
            </Button>
          </form>
        )}
      </div>
      <ChangeMobileModal
        phone={phone}
        countryCode={countryCode}
        isOpen={changeMobile}
        close={() => setChangeMobile(false)}
      />
    </>
  );
}
export default PersonalData;
