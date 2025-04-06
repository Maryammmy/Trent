import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useQueryParam } from "@/utils/getQueryParam";
import { IMessage } from "@/interfaces/chat";
import { useMessagesAPI } from "@/services/chatService";
import { MessageCircleMore } from "lucide-react";

function ChatWindow() {
  const ownerId = useQueryParam("user");
  const chatId = useQueryParam("chat");
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
      <ChatHeader owner={owner} />
      <ChatMessages messages={messages} />
      <ChatInput ownerId={ownerId} />
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
