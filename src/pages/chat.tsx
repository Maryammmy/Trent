import { useState } from "react";
import ChatList from "../components/chat/ChatList";
import ChatWindow from "../components/chat/ChatWindow";

export default function ChatApp() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  return (
    <div className="flex h-[90vh]">
      <ChatList onSelectChat={setSelectedChat} />
      <ChatWindow chatId={selectedChat} />
    </div>
  );
}
