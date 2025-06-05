import Input from "@/components/ui/Input";
import { addChatAPI } from "@/services/chatService";
import { ImageUp, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { uid } from "@/constants";
import { handleErrorMessage } from "@/utils/handleErrorMsg";

interface IProps {
  ownerId: string;
  propId: string | null;
  chatId: string | null;
}
const ChatInput = ({ ownerId, propId, chatId }: IProps) => {
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
        const newChatId = response?.data?.data?.chat_id;
        if (!chatId) {
          navigate(`/chat?prop=${propId}&user=${ownerId}&chat=${newChatId}`);
        } else {
          queryClient.refetchQueries({
            queryKey: ["messages", chatId],
          });
        }
        setNewMessage("");
      }
    } catch (error) {
      handleErrorMessage(error);
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
      if (response.data.response_code === 201) {
        const newChatId = response?.data?.data?.chat_id;
        if (!chatId) {
          navigate(`/chat?prop=${propId}&user=${ownerId}&chat=${newChatId}`);
        } else {
          queryClient.refetchQueries({
            queryKey: ["messages", chatId],
          });
        }
        setNewMessage("");
      }
    } catch (error) {
      handleErrorMessage(error);
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
