import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Image from "../ui/Image";
import { ChevronLeft } from "lucide-react";
import { useMessagesAPI } from "../../services/chatService";
import { IMessage } from "../../interfaces/chatInterface";
import {
  formatDateTime,
  formatTime12Hour,
} from "../../utils/formatDateAndTime";
interface IProps {
  selectedChat: number | null;
  onClose: () => void;
}
function ChatWindow({ selectedChat, onClose }: IProps) {
  const [newMessage, setNewMessage] = useState("");
  const { data } = useMessagesAPI(selectedChat);
  console.log(data?.data?.data?.chat_messages);
  const messages: IMessage[] = data?.data?.data?.chat_messages;
  return selectedChat ? (
    <div
      className={`${
        selectedChat
          ? "flex flex-col flex-1"
          : "hidden lg:flex lg:flex-col lg:flex-1"
      }`}
    >
      <div className="p-4 border-b bg-white flex items-center gap-3">
        <Button className="lg:hidden" onClick={onClose}>
          <ChevronLeft />
        </Button>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            imageUrl="/images/Trent-logo-pdf.png"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold">Mohamed</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages?.map((msg) => {
          const { date, time } = formatDateTime(msg?.created_at);
          const formattedTime = formatTime12Hour(time);
          const isSender = JSON.parse(msg?.is_sender);
          console.log(msg?.created_at);
          return isSender ? (
            <div key={msg?.id} className="mb-2 flex flex-col gap-1 items-end">
              <p className="text-xs text-dark text-center w-full">{date}</p>
              <p className="bg-white w-fit rounded-md rounded-tr-none p-2 shadow">
                {msg?.message}
              </p>
              <p>{formattedTime}</p>
            </div>
          ) : (
            <div key={msg?.id} className="mb-2 flex flex-col gap-1">
              <p className="text-xs text-gray-400 text-center">{date}</p>
              <p className="bg-white w-fit rounded-md rounded-tl-none p-2 shadow">
                {msg?.message}
              </p>
              <p>{formattedTime}</p>
            </div>
          );
        })}
      </div>
      <div className="border-t bg-white flex p-4 gap-2 flex-wrap">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="p-3 border rounded-md outline-none focus:border-2 focus:border-primary flex-1 min-w-0 w-full"
        />
        <Button
          className="bg-secondary font-medium px-4 py-2 rounded-md"
          onClick={() => {
            if (newMessage.trim()) {
              alert("Message sent: " + newMessage);
              setNewMessage("");
            }
          }}
        >
          Send
        </Button>
      </div>
    </div>
  ) : (
    <div
      className={`${
        selectedChat
          ? "flex flex-1 items-center justify-center"
          : "hidden lg:flex lg:flex-col lg:flex-1 lg:justify-center lg:items-center"
      }`}
    >
      <p className="text-gray-400 text-lg text-center font-medium">
        Select a chat to start messaging
      </p>
    </div>
  );
}
export default ChatWindow;
