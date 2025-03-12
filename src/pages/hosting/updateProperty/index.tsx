import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Button from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";
import { PropertyNameInputs } from "../../../types";
import ImageUploader from "./ImageUploader";
import VideoUploader from "./VideoUploader";
import toast from "react-hot-toast";
import PropertyTypeSelector from "./PropertyTypeSelector";
import GovernmentSelector from "./GovernmentSelector";
import FacilitiesSelector from "./FacilitiesSelector";
import PropertyInputs from "./PropertyInputs";
import PropertyTextArea from "./PropertyTextArea";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePropertySchema } from "../../../validation/updatePropertyValidation";
import PeriodSelector from "./PeriodSelector";
import {
  ApiError,
  IFacility,
  IGovernement,
  IPropertyType,
} from "../../../interfaces";
import { periods } from "../../../data";
import {
  useFacilitiesAPI,
  useGovernmentsAPI,
  usePropertyTypesAPI,
} from "../../../services/filtersService";
import {
  editPropertyAPI,
  usePropertyAPI,
} from "../../../services/propertyService";
import {
  IDetailsProperty,
  IFacilityProperty,
} from "../../../interfaces/propertyInterface";
import { baseURL } from "../../../services";
import { convertToFormData } from "../../../utils/convertToFormData";
import UpdateSkeleton from "../../../components/skeleton/UpdateSkeleton";
import Loader from "../../../components/loader/Loader";
import { defaultPropertyValues } from "../../../utils/defaultValues";

const userId = Cookies.get("user_id");
function UpdateProperty() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const { id } = useParams();
  const { data } = usePropertyAPI(id || "");
  const propertyDetails: IDetailsProperty = data?.data?.data?.property_details;
  const facilityListProperty: IFacilityProperty[] =
    data?.data?.data?.facility_list;
  const { data: propertyTypes } = usePropertyTypesAPI();
  const propertyTypeList: IPropertyType[] =
    propertyTypes?.data?.data?.category_list;
  const { data: facilityList } = useFacilitiesAPI();
  const facilities: IFacility[] = facilityList?.data?.data?.facility_list;
  const { data: governments } = useGovernmentsAPI();
  const governmentList: IGovernement[] =
    governments?.data?.data?.government_list;
  const owner = data?.data?.data?.property_details.user_id;
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PropertyNameInputs>({
    resolver: yupResolver(updatePropertySchema),
    defaultValues: defaultPropertyValues,
  });
  useEffect(() => {
    if (propertyDetails && facilityListProperty) {
      setVideo(baseURL + propertyDetails?.video);
      setImages(
        propertyDetails?.image_list?.map((image) => baseURL + image.img)
      );
      reset({
        uid: userId,
        prop_id: id,
        video: propertyDetails?.video,
        images: propertyDetails?.image_list?.map((image) => image?.img),
        price: propertyDetails?.price,
        facilities: facilityListProperty?.map((facility) => facility?.id),
        beds_count: propertyDetails?.beds_count,
        bathrooms_count: propertyDetails?.bathrooms_count,
        sqft: propertyDetails?.sqrft,
        category_id: propertyDetails?.category?.id,
        maps_url: propertyDetails?.maps_url,
        security_deposit: propertyDetails?.security_deposit,
        government_id: propertyDetails?.government?.id,
        city_en: propertyDetails?.city?.en,
        city_ar: propertyDetails?.city?.ar,
        title_en: propertyDetails?.title?.en,
        title_ar: propertyDetails?.title?.ar,
        compound_en: propertyDetails?.compound?.en,
        compound_ar: propertyDetails?.compound?.ar,
        address_en: propertyDetails?.address?.en,
        address_ar: propertyDetails?.address?.ar,
        floor_en: propertyDetails?.floor?.en,
        floor_ar: propertyDetails?.floor?.ar,
        guest_count: propertyDetails?.guest_count,
        min_days: propertyDetails?.min_days,
        max_days: propertyDetails?.max_days,
        period: propertyDetails?.period?.id,
        description_en: propertyDetails?.description?.en,
        description_ar: propertyDetails?.description?.ar,
        guest_rules_en: propertyDetails?.guest_rules?.en,
        guest_rules_ar: propertyDetails?.guest_rules?.ar,
      });
    }
  }, [propertyDetails, facilityListProperty, reset, id]);
  const onUpdate = async (data: PropertyNameInputs) => {
    const formData = convertToFormData(data);
    try {
      setLoading(true);
      const response = await editPropertyAPI(formData);
      if (response?.data?.response_code === 200)
        toast.success(response?.data?.response_message);
      setTimeout(() => {
        navigate("/hosting/properties");
      }, 1000);
    } catch (error) {
      console.error(error);
      const customError = error as ApiError;
      if (customError?.response?.data?.response_message) {
        toast.error(customError?.response?.data?.response_message);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      selectedFiles.forEach((file) => {
        if (file.size < 51200) {
          setImageError(t("image_too_small"));
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          if (images && !images.includes(imageDataUrl)) {
            const updatedPhotos = [...images, imageDataUrl];
            setImages(updatedPhotos);
            setValue("images", updatedPhotos);
            toast.success(t("image_uploaded_successfully"));
            setImageError(null);
          } else {
            setImageError(t("image_already_uploaded"));
          }
        };
      });
    }
  };
  const handleDeleteImage = (image: string) => {
    setImages((prevImages) => prevImages.filter((item) => item !== image));
    setImageError(null);
    toast.error(t("iamge_deleted_successfully"));
  };
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.type.startsWith("video/")) {
        setVideoError(t("invalid_video_format"));
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        setVideoError(t("video_too_large"));
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const videoDataUrl = reader.result as string;
        setVideo(videoDataUrl);
        setValue("video", videoDataUrl);
        toast.success(t("video_uploaded_successfully"));
        setVideoError(null);
      };
    }
  };
  const handleDeleteVideo = () => {
    setVideo("");
    setVideoError(null);
    toast.error(t("video_deleted_successfully"));
  };
  useEffect(() => {
    if (owner && userId && userId !== owner) {
      setTimeout(() => {
        navigate("/hosting/properties");
      }, 1000);
    }
  }, [owner, navigate]);
  if (owner && userId && userId !== owner) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-500">
          You are not authorized to edit this property.
        </h2>
      </div>
    );
  }
  return (
    <div className="bg-update-property bg-fixed bg-cover bg-no-repeat min-h-screen">
      <div className="max-w-screen-md py-5 md:py-10 px-5 2xl:px-20">
        <h2 className="font-semibold text-xl md:text-3xl py-8 text-white">
          {t("update_Property")}
        </h2>
        {data ? (
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
            <PropertyTypeSelector
              control={control}
              errors={errors}
              propertyTypeList={propertyTypeList}
            />
            <GovernmentSelector
              control={control}
              errors={errors}
              governmentList={governmentList}
            />
            <PeriodSelector
              control={control}
              errors={errors}
              periods={periods}
            />
            <PropertyInputs control={control} errors={errors} />
            <PropertyTextArea control={control} errors={errors} />
            <FacilitiesSelector
              control={control}
              errors={errors}
              facilities={facilities}
            />
            <ImageUploader
              images={images}
              handleImageChange={handleImageChange}
              handleDeleteImage={handleDeleteImage}
              imageError={imageError}
              errors={errors}
            />
            <VideoUploader
              handleDeleteVideo={handleDeleteVideo}
              handleVideoChange={handleVideoChange}
              video={video}
              videoError={videoError}
              errors={errors}
            />
            <div className="flex justify-end items-center">
              <Button
                disabled={loading}
                type="submit"
                className="bg-primary font-medium text-white py-3 rounded-md w-40"
              >
                {loading ? <Loader /> : t("update_Property")}
              </Button>
            </div>
          </form>
        ) : (
          <UpdateSkeleton cards={12} />
        )}
      </div>
    </div>
  );
}

export default UpdateProperty;
