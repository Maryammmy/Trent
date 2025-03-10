import { openDB } from "idb";

const getVideoFromIndexedDB = async () => {
  try {
    const db = await openDB("videoDB", 1);
    const tx = db.transaction("videos", "readonly");
    const store = tx.objectStore("videos");
    const storedVideo = await store.get("uploadedVideo");
    await tx.done;
    return storedVideo;
  } catch (error) {
    console.error("❌ Error retrieving video:", error);
  }
};

export default getVideoFromIndexedDB;
