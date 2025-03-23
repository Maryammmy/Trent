import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Image from "../ui/Image";
import { ChevronLeft, ImageUp, MessageCircleMore, Send } from "lucide-react";
import { useMessagesAPI } from "../../services/chatService";
import { IMessage } from "../../interfaces/chatInterface";
import {
  formatDateTime,
  formatTime12Hour,
} from "../../utils/formatDateAndTime";
import { baseURL } from "../../services";
import { useQueryParam } from "../../utils/getQueryParam";
import { useNavigate } from "react-router-dom";

function ChatWindow() {
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const ownerId = useQueryParam("user");
  const chatId = useQueryParam("chat");
  const chattedOwner = JSON.parse(
    sessionStorage.getItem("chattedOwner") || "{}"
  );
  const { data } = useMessagesAPI(Number(chatId), ownerId);
  const owner = data?.data?.data;
  const messages: IMessage[] = data?.data?.data?.chat_messages;
  return ownerId ? (
    <div
      className={`${
        ownerId
          ? "flex flex-col flex-1"
          : "hidden lg:flex lg:flex-col lg:flex-1"
      }`}
    >
      <div className="p-4 border-b bg-white flex items-center gap-3">
        <Button className="lg:hidden" onClick={() => navigate(`/chat`)}>
          <ChevronLeft />
        </Button>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            imageUrl={
              baseURL + (chatId ? owner?.receiver_image : chattedOwner?.img)
            }
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold">
          {chatId ? owner?.receiver_name : chattedOwner?.name}
        </h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages?.map((msg) => {
          const { date, time } = formatDateTime(msg?.created_at);
          const formattedTime = formatTime12Hour(time);
          const isSender = JSON.parse(msg?.is_sender);
          return isSender ? (
            <div key={msg?.id} className="mb-2 flex flex-col gap-1 items-end">
              <p className="text-xs text-dark text-center w-full">{date}</p>
              <p className="bg-white w-fit rounded-md rounded-tr-none p-2 shadow">
                {msg?.message}
              </p>
              <p className="text-xs font-medium text-dark">{formattedTime}</p>
            </div>
          ) : (
            <div key={msg?.id} className="mb-2 flex flex-col gap-1">
              <p className="text-xs text-gray-400 text-center">{date}</p>
              <p className="bg-white w-fit rounded-md rounded-tl-none p-2 shadow">
                {msg?.message}
              </p>
              <p className="text-xs font-medium text-dark">{formattedTime}</p>
            </div>
          );
        })}
      </div>
      <div className="border-t bg-white flex items-center justify-between p-2 gap-2 flex-wrap w-full">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="p-3 flex-1 outline-none min-w-0 w-full"
        />
        {newMessage ? (
          <Send size={30} className="text-dark" />
        ) : (
          <ImageUp size={30} className="text-dark" />
        )}
      </div>
    </div>
  ) : (
    <div className="hidden lg:flex lg:flex-col lg:flex-1 lg:gap-5 lg:justify-center lg:items-center">
      <MessageCircleMore className="text-dark" size={100} />
      <p className="text-dark text-lg text-center font-medium">
        Select a chat to start messaging
      </p>
    </div>
  );
}
export default ChatWindow;
