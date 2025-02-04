import { useState } from "react";
import { Upload } from "lucide-react";
import BackAndNext from "../../../components/hosting/BackAndNext";
import ProgressBarsWrapper from "../../../components/hosting/ProgressBarsWrapper";
import Image from "../../../components/ui/Image";
import Input from "../../../components/ui/Input";
import { useTranslation } from "react-i18next";

const PhotosForProperty = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<File[]>([]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setPhotos((prevPhotos) => [...prevPhotos, ...selectedFiles]);
    }
  };
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h2 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("photos_for_property")}
        </h2>
        <p className="max-w-2xl text-secondary font-medium">
          {t("photos_for_property_desc")}
        </p>
        <div className="py-8">
          <label className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-100">
            <Upload size={32} className="text-gray-500 mb-3" />
            <span className="text-gray-500">{t("add_photos")}</span>
            <Input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="rounded-lg overflow-hidden w-full h-28">
              <Image
                imageUrl={URL.createObjectURL(photo)}
                alt={`Uploaded photo ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "40%", "0px"]} />
      <BackAndNext
        back="/hosting/amenities"
        next="/hosting/title"
        isNextDisabled={photos.length < 5}
      />
    </div>
  );
};

export default PhotosForProperty;
