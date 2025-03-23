import ChatList from "../components/chat/ChatList";
import ChatWindow from "../components/chat/ChatWindow";

export default function ChatApp() {
  return (
    <div className="flex h-[90vh]">
      <ChatList />
      <ChatWindow />
    </div>
  );
}
