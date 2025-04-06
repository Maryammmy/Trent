import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import Video from "@/components/ui/Video";
import { baseURL } from "@/services";
import { PropertyNameInputs } from "@/types";
import { Upload, X } from "lucide-react";
import { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface VideoUploaderProps {
  video: string;
  handleVideoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteVideo: (video: string) => void;
  videoError: string | null;
  errors: FieldErrors<PropertyNameInputs>;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  video,
  handleVideoChange,
  handleDeleteVideo,
  videoError,
  errors,
}) => {
  const { t } = useTranslation();
  const isFromBackend = video.startsWith(baseURL);
  return (
    <div>
      <div>
        <label className="border-dashed border-2 border-gray-300 bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100">
          <Upload size={32} className="text-dark mb-3" />
          <span className="text-dark">{t("upload_video")}</span>
          <Input
            name="videos"
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            onChange={handleVideoChange}
          />
        </label>
      </div>
      {video && (
        <div className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="w-full h-28">
                <Video videoUrl={video} className="w-full h-full rounded-lg" />
              </div>
              {!isFromBackend && (
                <Button
                  onClick={() => handleDeleteVideo(video)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <X size={15} />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {videoError && <InputErrorMessage msg={videoError} />}
      {errors["video"] && <InputErrorMessage msg={errors["video"]?.message} />}
    </div>
  );
};

export default VideoUploader;
