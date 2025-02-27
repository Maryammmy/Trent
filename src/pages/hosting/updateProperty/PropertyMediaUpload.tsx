import { Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "../../../components/ui/Image";
import Button from "../../../components/ui/Button";
import Video from "../../../components/ui/Video";
import Input from "../../../components/ui/Input";

interface PropertyMediaUploadProps {
  images: string[] | null;
  video: string | null;
  setVideo: (video: string | null) => void;
}

function PropertyMediaUpload({
  images,
  video,
  setVideo,
}: PropertyMediaUploadProps) {
  const { t } = useTranslation();

  return (
    <div>
      <label className="border-dashed border-2 border-gray-300 bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100">
        <Upload size={32} className="text-dark mb-3" />
        <span className="text-dark">{t("add_photos")}</span>
        <Input type="file" multiple accept="image/*" className="hidden" />
      </label>
      {images &&
        images.map((image, index) => (
          <Image
            key={index}
            className="w-full h-full object-cover"
            imageUrl={image}
            alt={`Uploaded ${index}`}
          />
        ))}
      {video && <Video videoUrl={video} />}
      {video && (
        <Button onClick={() => setVideo(null)}>{t("delete_video")}</Button>
      )}
    </div>
  );
}

export default PropertyMediaUpload;
