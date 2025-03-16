import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import { updateUserAPI, useUserAPI } from "../../../services/userService";
import { IUser } from "../../../interfaces/accountSettingsInterface";
import Select from "../../ui/Select";
import { gender } from "../../../data/accountSettingsData/personalInfoData";
import UpdateSkeleton from "../../skeleton/UpdateSkeleton";
import Image from "../../ui/Image";
import { baseURL } from "../../../services";
import toast from "react-hot-toast";
import { personalDataSchema } from "../../../validation/personalDataSchema";
import Input from "../../ui/Input";
import { convertPersonalDataToFormData } from "../../../utils/convertPersonalDataToFormData";
import Cookies from "js-cookie";
import { allowedImageTypes } from "../../../constants";
import InputErrorMessage from "../../ui/InputErrorMessage";
import Loader from "../../loader/Loader";

const uid = Cookies.get("user_id");
function PersonalData() {
  const { t } = useTranslation();
  const { data } = useUserAPI();
  const user: IUser = data?.data?.data?.user_data;
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [imageError, setImageError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalDataSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      gender: "",
      pro_img: "",
    },
  });
  useEffect(() => {
    if (user) {
      reset({
        uid: uid,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        pro_img: user?.pro_img,
      });
      setPreviewImage(baseURL + user?.pro_img);
    }
  }, [user, reset]);
  const onSubmit = async (data: IUser) => {
    setImageError(null);
    const formData = convertPersonalDataToFormData(data);
    try {
      setLoading(true);
      const response = await updateUserAPI(formData);
      if (response?.data?.response_code === 200) {
        toast.success(t("profile_updated_successfully"));
      }
    } catch {
      toast.error(t("something_went_wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-[2]">
      {!user ? (
        <UpdateSkeleton cards={4} />
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
            {imageError && <p className="text-red-500">{imageError}</p>}
          </div>
          <div className="border-b pb-5 pt-4 flex flex-col gap-2">
            <label className="font-bold">{t("legal_name")}</label>
            <Controller
              name="full_name"
              control={control}
              render={({ field }) => (
                <Input {...field} className="w-full p-2 border rounded" />
              )}
            />
            {errors.full_name && (
              <InputErrorMessage msg={errors.full_name.message} />
            )}
          </div>
          <div className="border-b pb-5 pt-4 flex flex-col gap-2">
            <label className="font-bold">{t("email")}</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} className="w-full p-2 border rounded" />
              )}
            />
            {errors.email && <InputErrorMessage msg={errors.email.message} />}
          </div>
          <div className="border-b pb-5 pt-4 flex flex-col gap-2">
            <label className="font-bold">{t("phone_number")}</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input {...field} className="w-full p-2 border rounded" />
              )}
            />
            {errors.phone && <InputErrorMessage msg={errors.phone.message} />}
          </div>
          <div className="pb-8 pt-4 flex flex-col gap-2">
            <label className="font-bold">{t("gender")}</label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => <Select {...field} options={gender} />}
            />
            {errors.gender && <InputErrorMessage msg={errors.gender.message} />}
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-white font-medium py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? <Loader /> : t("update")}
          </Button>
        </form>
      )}
    </div>
  );
}

export default PersonalData;
