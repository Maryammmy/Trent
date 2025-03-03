import { Upload, X } from "lucide-react";
import Input from "../../../components/ui/Input";
import Image from "../../../components/ui/Image";
import Button from "../../../components/ui/Button";
import InputErrorMessage from "../../../components/ui/InputErrorMessage";
import { useTranslation } from "react-i18next";
import { FieldErrors } from "react-hook-form";
import { PropertyNameInputs } from "../../../types";
interface IProps {
  images: string[];
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage: (image: string) => void;
  imageError: string | null;
  errors: FieldErrors<PropertyNameInputs>;
}
const ImageUploader = ({
  images,
  handleImageChange,
  handleDeleteImage,
  imageError,
  errors,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <div>
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
      {images.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div className="relative" key={image}>
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
          {imageError && <InputErrorMessage msg={imageError} />}
        </div>
      )}
      {errors["images"] && (
        <InputErrorMessage msg={errors["images"]?.message} />
      )}
    </div>
  );
};

export default ImageUploader;
