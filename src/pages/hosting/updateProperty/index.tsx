import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePropertySchema } from "../../../validation/updatePropertyValidation";
import PeriodSelector from "./PeriodSelector";
import { IFacility, IGovernement, IPropertyType } from "../../../interfaces";
import { periods } from "../../../data";
import {
  useFacilitiesAPI,
  useGovernmentsAPI,
  usePropertyTypesAPI,
} from "../../../services/filtersService";

const userId = Cookies.get("user_id");
function UpdateProperty() {
  const { t } = useTranslation();
  const [video, setVideo] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const { id } = useParams();
  const { data: propertyTypes } = usePropertyTypesAPI();
  const propertyTypeList: IPropertyType[] = propertyTypes?.data?.category_list;
  const { data: facilityList } = useFacilitiesAPI();
  const facilities: IFacility[] = facilityList?.data?.facility_list;
  const { data: governments } = useGovernmentsAPI();
  const governmentList: IGovernement[] = governments?.data?.government_list;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PropertyNameInputs>({
    resolver: yupResolver(updatePropertySchema),
    defaultValues: {
      uid: userId,
      prop_id: id,
      video: "",
      images: [],
      price: "",
      facility: [],
      beds: "",
      bathroom: "",
      sqft: "",
      ptype: propertyTypeList?.[0]?.id,
      google_maps_url: "",
      security_deposit: "",
      government: governmentList?.[0]?.id,
      city_en: "",
      city_ar: "",
      title_en: "",
      title_ar: "",
      compound_name_en: "",
      compound_name_ar: "",
      address_en: "",
      address_ar: "",
      floor_en: "",
      floor_ar: "",
      plimit: "",
      min_days: "",
      max_days: "",
      period: periods[0].value,
      description_en: "",
      description_ar: "",
      guest_rules_en: "",
      guest_rules_ar: "",
    },
  });

  const onUpdate = (data: PropertyNameInputs) => {
    console.log("Updated Data:", data);
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
  return (
    <div className="bg-update-property bg-fixed bg-cover bg-no-repeat">
      <div className="max-w-screen-md py-5 md:py-10 px-5 2xl:px-20">
        <h2 className="font-semibold text-xl md:text-3xl py-8 text-white">
          Update property
        </h2>
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
          <PeriodSelector control={control} errors={errors} periods={periods} />
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
              type="submit"
              className="bg-primary font-medium text-white py-3 px-4 rounded"
            >
              Update Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProperty;
