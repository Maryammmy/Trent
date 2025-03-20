import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "../../../components/ui/Image";
import Input from "../../../components/ui/Input";
import { useTranslation } from "react-i18next";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button";
import InputErrorMessage from "../../../components/ui/InputErrorMessage";
import { allowedImageTypes } from "../../../constants";

const storedImages = sessionStorage.getItem("images");

const Images = () => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(
    storedImages ? JSON.parse(storedImages) : []
  );
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const validImages: string[] = [];
      selectedFiles.forEach((file) => {
        if (!allowedImageTypes.includes(file.type)) {
          setImageError(t("invalid_image_format"));
          return;
        }
        if (file.size > 2097152) {
          setImageError(t("image_too_large"));
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          if (
            !images.includes(imageDataUrl) &&
            !validImages.includes(imageDataUrl)
          ) {
            validImages.push(imageDataUrl);
          } else {
            setImageError(t("image_already_uploaded"));
          }
          if (validImages.length > 0) {
            const updatedPhotos = [...images, ...validImages];
            sessionStorage.setItem("images", JSON.stringify(updatedPhotos));
            setImages(updatedPhotos);
            setImageError(null);
          }
        };
      });
    }
  };
  const handleDeleteImage = (image: string) => {
    setImages((prevImages) => prevImages.filter((item) => item !== image));
    setImageError(null);
    toast.success(t("iamge_deleted_successfully"));
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
            <span className="text-dark">{t("upload_images")}</span>
            <Input
              type="file"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div>
          {images.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div className="relative" key={index}>
                  <div className="rounded-lg overflow-hidden w-full h-28">
                    <Image
                      imageUrl={image}
                      alt={`Uploaded photo ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    onClick={() => handleDeleteImage(image)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X size={15} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {imageError && <InputErrorMessage msg={imageError} />}
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
