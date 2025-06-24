import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import Input from "@/components/ui/Input";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import { ISelectedImage } from "@/interfaces/property/updateProperty";
import { baseURL } from "@/services";
import { PropertyNameInputs } from "@/types";
import { Upload, X } from "lucide-react";
import { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  selectedImages: ISelectedImage[];
  existingImages: string[];
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage: (image: string) => void;
  imageError: string | null;
  errors: FieldErrors<PropertyNameInputs>;
}
const ImageUploader = ({
  selectedImages,
  existingImages,
  handleImageChange,
  handleDeleteImage,
  imageError,
  errors,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <h4 className="text-dark font-medium mb-1">{t("images")}</h4>
      <div>
        <label className="border-dashed border-2 border-gray-300 bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100">
          <Upload size={32} className="text-dark mb-3" />
          <span className="text-dark">{t("upload_images")}</span>
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
      {[...selectedImages.map((img) => img.url), ...existingImages]?.length >
        0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...selectedImages.map((img) => img.url), ...existingImages]?.map(
              (image, index) => {
                const isFromBackend = existingImages.includes(image);
                const finalUrl = isFromBackend ? `${baseURL}/${image}` : image;
                return (
                  <div className="relative" key={index}>
                    <div className="rounded-lg overflow-hidden w-full h-28">
                      <Image
                        imageUrl={finalUrl}
                        alt={`Uploaded photo ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {
                      <Button
                        type="button"
                        onClick={() => handleDeleteImage(image)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X size={15} />
                      </Button>
                    }
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
      {imageError && <InputErrorMessage msg={imageError} />}
      {errors["images"] && (
        <InputErrorMessage msg={errors["images"]?.message} />
      )}
    </div>
  );
};

export default ImageUploader;
