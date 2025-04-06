import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import PropertyInputs from "./PropertyInputs";
import PropertyTextArea from "./PropertyTextArea";
import FacilitiesSelector from "./FacilitiesSelector";
import PropertyTypeSelector from "./PropertyTypeSelector";
import GovernmentSelector from "./GovernmentSelector";
import PeriodSelector from "./PeriodSelector";
import VideoUploader from "./VideoUploader";
import ImageUploader from "./ImageUploader";
import { useNavigate } from "react-router-dom";
import { useCancellationPoliciesAPI } from "@/services/conditionService";
import CancellationPolicy from "./CancellationPolicy";
import { allowedImageTypes, allowedVideoTypes } from "@/constants";
import { IPropertyType, IFacility, IGovernement, ApiError } from "@/interfaces";
import {
  ISingleProperty,
  IDetailsProperty,
  IFacilityProperty,
} from "@/interfaces/property/property";
import { baseURL } from "@/services";
import {
  usePropertyTypesAPI,
  useFacilitiesAPI,
  useGovernmentsAPI,
  useFiltersAPI,
} from "@/services/filtersService";
import { editPropertyAPI } from "@/services/propertyService";
import { PropertyNameInputs } from "@/types";
import { convertToFormData } from "@/utils/convertToFormData";
import { defaultPropertyValues } from "@/utils/defaultValues";
import { updatePropertySchema } from "@/validation/updatePropertySchema";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";
import Button from "@/components/ui/Button";
import { ICancellationPolicy } from "@/interfaces/property/updateProperty";

interface UpdatePropertyFormProps {
  propertyData: ISingleProperty;
  propertyId: string | undefined;
  userId: string | undefined;
}

function UpdatePropertyForm({
  propertyData,
  propertyId,
  userId,
}: UpdatePropertyFormProps) {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [video, setVideo] = useState<string>("");
  const [imageError, setImageError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const propertyDetails: IDetailsProperty = propertyData?.property_details;
  const facilityListProperty: IFacilityProperty[] = propertyData?.facility_list;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: propertyTypeList } = usePropertyTypesAPI();
  const propertyTypes: IPropertyType[] =
    propertyTypeList?.data?.data?.category_list;
  const { data: facilityList } = useFacilitiesAPI();
  const facilities: IFacility[] = facilityList?.data?.data?.facility_list;
  const { data: governmentList } = useGovernmentsAPI();
  const governments: IGovernement[] =
    governmentList?.data?.data?.government_list;
  const { data: filters } = useFiltersAPI();
  const periods = filters?.data?.data?.period_list;
  const { data } = useCancellationPoliciesAPI();
  const cancellationPolicies: ICancellationPolicy[] =
    data?.data?.data?.cancellation_policies_list;
  console.log(video);
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
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const validFiles = selectedFiles.filter((file) => {
        if (!allowedImageTypes.includes(file.type)) {
          setImageError(t("invalid_image_format"));
          return false;
        }
        if (file.size > 2097152) {
          setImageError(t("image_too_large"));
          return false;
        }
        return true;
      });
      if (validFiles.length === 0) return;
      const fileUrls = validFiles.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...fileUrls]);
      setSelectedImages((prev) => [...prev, ...validFiles]);
      setValue("images", [...images, ...selectedImages, ...validFiles]);
      toast.success(t("image_uploaded_successfully"));
      setImageError(null);
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
      if (!allowedVideoTypes.includes(file.type)) {
        setVideoError(t("invalid_video_format"));
        return;
      }
      if (file.size < 1048576) {
        setVideoError(t("video_too_small"));
        return;
      }
      if (file.size > 52428800) {
        setVideoError(t("video_too_large"));
        return;
      }
      setVideo(URL.createObjectURL(file));
      setValue("video", file);
      toast.success(t("video_uploaded_successfully"));
      setVideoError(null);
    }
  };
  const handleDeleteVideo = () => {
    setVideo("");
    setVideoError(null);
    toast.error(t("video_deleted_successfully"));
  };
  const handleClickCancellationPolicy = () => setIsOpen(!isOpen);
  useEffect(() => {
    if (propertyDetails && facilityListProperty) {
      setVideo(propertyDetails?.video ? baseURL + propertyDetails?.video : "");
      setImages(
        propertyDetails?.image_list?.map((image) => baseURL + image.img)
      );
      reset({
        uid: userId,
        prop_id: propertyId,
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
        cancellation_policy_id: propertyDetails?.cancellation_policy?.id,
      });
    }
  }, [propertyDetails, facilityListProperty, reset, propertyId, userId]);

  const onSubmit = async (data: PropertyNameInputs) => {
    const formData = convertToFormData(data);
    console.log(data);
    try {
      setLoading(true);
      const response = await editPropertyAPI(formData);
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        setTimeout(() => {
          navigate("/hosting/properties");
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PropertyTypeSelector
          control={control}
          errors={errors}
          propertyTypes={propertyTypes}
        />
        <GovernmentSelector
          control={control}
          errors={errors}
          governments={governments}
        />
        <PeriodSelector control={control} errors={errors} periods={periods} />
        <CancellationPolicy
          isOpen={isOpen}
          cancellationPolicies={cancellationPolicies}
          handleOnClick={handleClickCancellationPolicy}
          control={control}
          errors={errors}
        />
        <FacilitiesSelector
          control={control}
          errors={errors}
          facilities={facilities}
        />
        <PropertyInputs control={control} errors={errors} />
        <PropertyTextArea control={control} errors={errors} />
        <ImageUploader
          images={images}
          handleImageChange={handleImageChange}
          handleDeleteImage={handleDeleteImage}
          errors={errors}
          imageError={imageError}
        />
        <VideoUploader
          handleVideoChange={handleVideoChange}
          handleDeleteVideo={handleDeleteVideo}
          video={video}
          errors={errors}
          videoError={videoError}
        />
      </div>

      <div className="flex justify-end items-center">
        <Button
          disabled={loading}
          type="submit"
          className="bg-primary text-white font-semibold py-3 rounded-md w-40"
        >
          {loading ? <Loader /> : t("update_Property")}
        </Button>
      </div>
    </form>
  );
}

export default UpdatePropertyForm;
