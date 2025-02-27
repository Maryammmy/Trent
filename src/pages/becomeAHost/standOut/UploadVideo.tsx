import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Input from "../../../components/ui/Input";
import { useTranslation } from "react-i18next";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import toast from "react-hot-toast";
import Video from "../../../components/ui/Video";
import { openDB } from "idb";
import Button from "../../../components/ui/Button";

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

const UploadVideo = () => {
  const { t } = useTranslation();
  const [video, setVideo] = useState<string | null>(null);
  useEffect(() => {
    getVideoFromIndexedDB().then((storedVideo) => {
      if (storedVideo) {
        setVideo(storedVideo);
      }
    });
  }, []);
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
            <Video videoUrl={video} className="w-full rounded-lg" />
            <div className="flex items-center justify-end">
              <Button
                onClick={handleDeleteVideo}
                className="mt-4 bg-red-500 font-medium text-white px-4 py-2 rounded-lg"
              >
                {t("delete_video")}
              </Button>
            </div>
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
