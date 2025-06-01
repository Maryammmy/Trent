import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useQueryParam } from "@/utils/getQueryParam";
import { IMessage } from "@/interfaces/chat";
import { useMessagesAPI } from "@/services/chatService";
import { MessageCircleMore } from "lucide-react";
import ChatProperty from "./ChatProperty";

function ChatWindow() {
  const ownerId = useQueryParam("user");
  const chatId = useQueryParam("chat");
  const propId = useQueryParam("prop");
  const { data } = useMessagesAPI(chatId);
  const owner = data?.data?.data;
  const messages: IMessage[] = data?.data?.data?.chat_messages;
  return ownerId ? (
    <div
      className={`${
        ownerId
          ? "flex flex-col flex-1 min-w-0"
          : "hidden lg:flex lg:flex-col lg:flex-1 lg:min-w-0"
      }`}
    >
      <ChatHeader owner={owner} />
      <ChatProperty />
      <ChatMessages messages={messages} />
      <ChatInput ownerId={ownerId} propId={propId} chatId={chatId} />
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
