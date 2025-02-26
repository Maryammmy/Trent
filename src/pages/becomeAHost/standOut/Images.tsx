import { useState } from "react";
import { Upload } from "lucide-react";
import Image from "../../../components/ui/Image";
import Input from "../../../components/ui/Input";
import { useTranslation } from "react-i18next";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import toast from "react-hot-toast";

const storedImages = sessionStorage.getItem("images");

const Images = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState<string[]>(
    storedImages ? JSON.parse(storedImages) : []
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      selectedFiles.forEach((file) => {
        if (file.size < 51200) {
          toast.error(t("image_too_small"));
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          if (!images.includes(imageDataUrl)) {
            const updatedPhotos = [...images, imageDataUrl];
            sessionStorage.setItem("images", JSON.stringify(updatedPhotos));

            setImages(updatedPhotos);
          } else {
            toast.error(t("image_already_uploaded"));
          }
        };
      });
    }
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h2 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("photos_for_property")}
        </h2>
        <p className="max-w-2xl text-dark font-medium">
          {t("photos_for_property_desc")}
        </p>
        <div className="py-8">
          <label className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-100">
            <Upload size={32} className="text-dark mb-3" />
            <span className="text-dark">{t("add_photos")}</span>
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
          {images.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden w-full h-28">
              <Image
                imageUrl={image}
                alt={`Uploaded photo ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "22.22%", "0px"]} />
      <BackAndNext
        back="/become-a-host/facilities"
        next="/become-a-host/video"
        isNextDisabled={images.length < 3}
      />
    </div>
  );
};

export default Images;
