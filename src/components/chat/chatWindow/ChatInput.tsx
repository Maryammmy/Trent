import Input from "@/components/ui/Input";
import { addChatAPI } from "@/services/chatService";
import { ImageUp, Send } from "lucide-react";
import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ApiError } from "@/interfaces";
import { useNavigate } from "react-router-dom";

const uid = Cookies.get("user_id");
interface IProps {
  ownerId: string;
  propId: string | null;
  chatId: string | null;
}
const ChatInput = ({ ownerId, propId, chatId }: IProps) => {
  const { t } = useTranslation();
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  console.log(chatId, ownerId);
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
      if (response.data.response_code === 201) {
        if (!chatId) {
          navigate(
            `/chat?prop=${propId}&user=${ownerId}&chat=${response?.data?.data?.chat_id}`
          );
        }
        queryClient.refetchQueries({
          queryKey: ["messages"],
        });
        setNewMessage("");
      }
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
      console.log(error);
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
