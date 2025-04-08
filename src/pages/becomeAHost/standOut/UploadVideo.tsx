import { useContext, useState } from "react";
import { Upload, X } from "lucide-react";
import Input from "../../../components/ui/Input";
import { useTranslation } from "react-i18next";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import toast from "react-hot-toast";
import Video from "../../../components/ui/Video";
import Button from "../../../components/ui/Button";
import InputErrorMessage from "../../../components/ui/InputErrorMessage";
import { HostingContext } from "../../../context/HostingContext";
import { allowedVideoTypes } from "../../../constants";

const UploadVideo = () => {
  const { t } = useTranslation();
  const { setSelectedVideo, selectedVideo } = useContext(HostingContext);
  const [video, setVideo] = useState<string | null>(
    selectedVideo ? URL.createObjectURL(selectedVideo) : null
  );
  const [videoError, setVideoError] = useState<string | null>(null);
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
      setSelectedVideo(file);
      toast.success(t("video_uploaded_successfully"));
      sessionStorage.setItem("hasUploadedVideo", "true");
      setVideoError(null);
    }
  };
  const handleDeleteVideo = () => {
    setVideo("");
    setSelectedVideo(null);
    setVideoError(null);
    toast.success(t("video_deleted_successfully"));
  };
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h2 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("video_for_property")}
          <span className="text-sm ml-1 text-dark">{t("optional")}</span>
        </h2>
        <p className="max-w-2xl text-dark font-medium">
          {t("video_for_property_desc")}
        </p>
        <div className="py-8">
          <label className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-100">
            <Upload size={32} className="text-dark mb-3" />
            <span className="text-dark">{t("upload_video")}</span>
            <Input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoChange}
            />
          </label>
        </div>
        {video && (
          <div className="relative w-full rounded-lg overflow-hidden">
            <div className="w-full h-full">
              <Video videoUrl={video} className="w-full h-full object-cover" />
            </div>
            <Button
              onClick={handleDeleteVideo}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <X size={15} />
            </Button>
          </div>
        )}
        {videoError && <InputErrorMessage msg={videoError} />}
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "33.33%", "0px"]} />
      <BackAndNext back="/become-a-host/images" next="/become-a-host/title" />
    </div>
  );
};

export default UploadVideo;
