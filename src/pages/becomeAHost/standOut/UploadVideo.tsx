import { useState } from "react";
import { Upload } from "lucide-react";
import Input from "../../../components/ui/Input";
import { useTranslation } from "react-i18next";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import toast from "react-hot-toast";
import Video from "../../../components/ui/Video";

const storedVideo = sessionStorage.getItem("video");

const UploadVideo = () => {
  const { t } = useTranslation();
  const [video, setVideo] = useState<string | null>(
    storedVideo ? JSON.parse(storedVideo) : null
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      reader.onloadend = () => {
        const videoDataUrl = reader.result as string;
        sessionStorage.setItem("video", JSON.stringify(videoDataUrl));
        setVideo(videoDataUrl);
        toast.success(t("video_uploaded_successfully"));
      };
    }
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h2 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("video_for_property")}
        </h2>
        <p className="max-w-2xl text-dark font-medium">
          {t("video_for_property_desc")}
        </p>
        <div className="py-8">
          <label className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-100">
            <Upload size={32} className="text-dark mb-3" />
            <span className="text-dark">{t("add_video")}</span>
            <Input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {video && (
          <div className="mt-4">
            <Video
              videoUrl="your-video-url.mp4"
              className="w-full rounded-lg"
            />
          </div>
        )}
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "33.33%", "0px"]} />
      <BackAndNext
        back="/become-a-host/images"
        next="/become-a-host/title"
        isNextDisabled={!video}
      />
    </div>
  );
};

export default UploadVideo;
