import Input from "@/components/ui/Input";
import { addChatAPI } from "@/services/chatService";
import { useQueryParam } from "@/utils/getQueryParam";
import { ImageUp, Send } from "lucide-react";
import { useRef, useState } from "react";
import Cookies from "js-cookie";

const uid = Cookies.get("user_id");
const ChatInput = ({ ownerId }: { ownerId: string }) => {
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const propId = useQueryParam("prop");
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const data = {
      sender_id: uid,
      receiver_id: ownerId,
      prop_id: propId,
      message: newMessage,
    };
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const response = await addChatAPI(formData);
      console.log("📤 تم إرسال الرسالة:", response);
      setNewMessage("");
    } catch (error) {
      console.error("🚨 خطأ أثناء إرسال الرسالة:", error);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const data = {
      sender_id: uid,
      receiver_id: ownerId,
      prop_id: propId,
      img: file,
    };
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const response = await addChatAPI(formData);
      console.log("📤 تم إرسال الصورة بنجاح:", response);
    } catch (error) {
      console.error("🚨 خطأ أثناء رفع الصورة:", error);
    }
  };

  return (
    <div className="border-t bg-white flex items-center justify-between p-2 gap-2 flex-wrap w-full">
      <Input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
        className="p-3 flex-1 outline-none min-w-0 w-full"
      />

      {newMessage ? (
        <Send
          size={30}
          className="text-dark cursor-pointer"
          onClick={handleSendMessage}
        />
      ) : (
        <>
          <ImageUp
            size={30}
            className="text-dark cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;
