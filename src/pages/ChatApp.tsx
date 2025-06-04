import ChatList from "../components/chat/ChatList";
import ChatWindow from "../components/chat/chatWindow/ChatWindow";

export default function ChatApp() {
  return (
    <div className="flex mobile-chat-layout sm:sm-chat-layout">
      <ChatList />
      <ChatWindow />
    </div>
  );
}
