import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/ui/Input";
import { useEffect, useState } from "react";
import { useGetData } from "../../../hooks/useGetData";
import SelectSkeleton from "../../../components/skeleton/SelectSkeleton";
import Select from "../../../components/ui/Select";
import { IFacility, IGovernement, IPropertyType } from "../../../interfaces";
import Button from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";
import { Upload } from "lucide-react";
import Image from "../../../components/ui/Image";
import InputErrorMessage from "../../../components/ui/InputErrorMessage";
import { openDB } from "idb";
import toast from "react-hot-toast";
import Video from "../../../components/ui/Video";
import {
  propertyInputsData,
  propertyTextAreasData,
} from "../../../data/property";
import { priceType } from "../../../data";
import { PropertyNameInputs } from "../../../types";
import TextArea from "../../../components/ui/TextArea";

const currentLanguage = localStorage.getItem("i18nextLng");

const initDB = async () => {
  try {
    return await openDB("videoDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("videos")) {
          db.createObjectStore("videos");
        }
      },
    });
  } catch (error) {
    console.error("❌ Failed to initialize IndexedDB:", error);
    return null;
  }
};
const storeVideoInIndexedDB = async (videoDataUrl: string) => {
  try {
    const db = await initDB();
    if (!db) return;
    const tx = db.transaction("videos", "readwrite");
    const store = tx.objectStore("videos");
    await store.put(videoDataUrl, "uploadedVideo");
    await tx.done;
    console.log("✅ Video stored successfully in IndexedDB");
  } catch (error) {
    console.error("❌ Error storing video in IndexedDB:", error);
  }
};
const getVideoFromIndexedDB = async () => {
  try {
    const db = await initDB();
    if (!db) return null;

    const tx = db.transaction("videos", "readonly");
    const store = tx.objectStore("videos");
    const video = await store.get("uploadedVideo");
    await tx.done;
    return video;
  } catch (error) {
    console.error("❌ Error retrieving video from IndexedDB:", error);
    return null;
  }
};
const deleteVideoFromIndexedDB = async () => {
  try {
    const db = await initDB();
    if (!db) return;
    const tx = db.transaction("videos", "readwrite");
    const store = tx.objectStore("videos");
    await store.delete("uploadedVideo");
    await tx.done;
    console.log("🗑 Video deleted from IndexedDB");
  } catch (error) {
    console.error("❌ Error deleting video from IndexedDB:", error);
  }
};
function UpdateProperty() {
  const { t } = useTranslation();
  const [video, setVideo] = useState<string | null>(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    // setValue,
    // formState: { errors },
  } = useForm<PropertyNameInputs>();
  const onUpdate = (data: PropertyNameInputs) => {
    console.log("Updated Data:", data);
  };
  const { data: propertyType } = useGetData(
    ["propertyTypeList"],
    `user_api/u_property_type.php?lang=${currentLanguage}`
  );
  const { data: government } = useGetData(
    ["governmentList"],
    `user_api/u_government.php?lang=${currentLanguage}`
  );
  const { data: facilityList } = useGetData(
    ["facilities"],
    `user_api/u_facility.php?lang=${currentLanguage}`
  );
  const facilities: IFacility[] = facilityList?.data?.facilitylist;
  const propertyTypeList: IPropertyType[] = propertyType?.data.typelist;
  const governmentList: IGovernement[] = government?.data?.governmentlist;
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
            setImageError(null);
          } else {
            setImageError(t("image_already_uploaded"));
          }
        };
      });
    }
  };
  useEffect(() => {
    getVideoFromIndexedDB().then((storedVideo) => {
      if (storedVideo) {
        setVideo(storedVideo);
      }
    });
  }, []);
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.type.startsWith("video/")) {
        toast.error(t("invalid_video_format"));
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        toast.error(t("video_too_large"));
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const videoDataUrl = reader.result as string;
        await storeVideoInIndexedDB(videoDataUrl);
        setVideo(videoDataUrl);
        toast.success(t("video_uploaded_successfully"));
      };
    }
  };
  const handleDeleteVideo = async () => {
    await deleteVideoFromIndexedDB();
    setVideo(null);
    toast.success(t("video_deleted_successfully"));
  };
  return (
    <div className="bg-update-property bg-fixed bg-cover bg-no-repeat">
      <div className="max-w-screen-md py-5 md:py-10 px-5 2xl:px-20">
        <h2 className="font-semibold text-xl md:text-3xl py-8 text-white">
          Update property
        </h2>
        <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-white">
              {t("property_type")}
            </label>
            {!propertyTypeList ? (
              <SelectSkeleton />
            ) : propertyTypeList?.length ? (
              <Controller
                name="ptype"
                control={control}
                defaultValue={propertyTypeList?.[0]?.id}
                render={({ field }) =>
                  propertyTypeList?.length === 1 ? (
                    <p className="border py-3 px-2 rounded-md bg-white">
                      {propertyTypeList?.[0]?.title}
                    </p>
                  ) : (
                    <Select
                      {...field}
                      options={propertyTypeList?.map(
                        (propertyType: IPropertyType) => ({
                          value: propertyType?.id,
                          label: propertyType?.title,
                        })
                      )}
                      className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
                    />
                  )
                }
              />
            ) : (
              <p className="border py-3 px-2 rounded-md bg-white">
                No property type found
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-white">{t("government")}</label>
            {!governmentList ? (
              <SelectSkeleton />
            ) : governmentList?.length ? (
              <Controller
                name="government"
                control={control}
                defaultValue={governmentList?.[0]?.id}
                render={({ field }) =>
                  governmentList?.length === 1 ? (
                    <p className="border py-3 px-2 rounded-md bg-white">
                      {governmentList?.[0]?.name}
                    </p>
                  ) : (
                    <Select
                      {...field}
                      options={governmentList?.map((gov: IGovernement) => ({
                        value: gov?.id,
                        label: gov?.name,
                      }))}
                      className="border py-3 px-2 bg-white rounded-md focus:border-2 focus:border-primary outline-none"
                    />
                  )
                }
              />
            ) : (
              <p className="border bg-white py-3 px-2 rounded-md">
                No government found
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-white">
              {t("pricing_type")}
            </label>
            <Controller
              name="price_type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={priceType}
                  className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
                />
              )}
            />
          </div>
          {propertyInputsData.map(({ name, label, type, placeholder }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-white">{t(label)}</label>
                  <Input
                    {...field}
                    type={type}
                    placeholder={t(placeholder)}
                    className="w-full border bg-white py-3 px-2 rounded-md outline-none focus:border-2 focus:border-primary"
                  />
                  {/* {errors[name] && (
                        <p className="text-red-500 text-sm">
                          {errors[name]?.message}
                        </p>
                      )} */}
                </div>
              )}
            />
          ))}
          {propertyTextAreasData.map(({ name, label, placeholder }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-white">{t(label)}</label>
                  <TextArea
                    {...field}
                    placeholder={t(placeholder)}
                    className="w-full border bg-white py-3 px-2 rounded-md outline-none focus:border-2 focus:border-primary"
                    maxLength={10000}
                    minLength={50}
                    rows={5}
                  />
                  {/* {errors[name] && (
                        <p className="text-red-500 text-sm">
                          {errors[name]?.message}
                        </p>
                      )} */}
                </div>
              )}
            />
          ))}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-white">{t("facilities")}</label>
            {!facilities ? (
              <SelectSkeleton />
            ) : facilities?.length ? (
              <Controller
                name="facility"
                control={control}
                render={({ field }) => (
                  <div className="border py-3 px-2 rounded-md bg-white">
                    {facilities?.map((facility: IFacility) => (
                      <label
                        key={facility.id}
                        className="flex items-center gap-2 py-1 font-medium"
                      >
                        <Input
                          type="checkbox"
                          value={facility.id}
                          checked={field.value?.includes(facility.id)}
                          onChange={(e) => {
                            const selectedValues = new Set(field.value || []);
                            if (e.target.checked) {
                              selectedValues.add(facility.id);
                              console.log(selectedValues);
                            } else {
                              selectedValues.delete(facility.id);
                            }
                            field.onChange(Array.from(selectedValues));
                          }}
                          className="accent-dark w-4 h-4"
                        />
                        {facility.title}
                      </label>
                    ))}
                  </div>
                )}
              />
            ) : (
              <p className="border bg-white py-3 px-2 rounded-md">
                No facilities found
              </p>
            )}
          </div>
          <div>
            <div>
              <label className="border-dashed border-2 border-gray-300 bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100">
                <Upload size={32} className="text-dark mb-3" />
                <span className="text-dark">{t("add_photos")}</span>
                <Input
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {images && (
              <div className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden w-full h-28"
                    >
                      <Image
                        imageUrl={image}
                        alt={`Uploaded photo ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                {imageError && <InputErrorMessage msg={imageError} />}
              </div>
            )}
          </div>
          <div>
            <div>
              <label className="border-dashed border-2 border-gray-300 bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100">
                <Upload size={32} className="text-dark mb-3" />
                <span className="text-dark">{t("add_video")}</span>
                <Input
                  name="video"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoChange}
                />
              </label>
            </div>
            {video && (
              <div className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Video videoUrl={video} className="w-full rounded-lg" />
                </div>
                <div className="flex items-center justify-end mt-2">
                  <Button
                    onClick={handleDeleteVideo}
                    className="bg-red-500 font-medium text-white px-4 py-2 rounded-lg"
                  >
                    {t("delete_video")}
                  </Button>
                </div>
              </div>
            )}
          </div>
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
