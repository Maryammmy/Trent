import { useState } from "react";
import { dummyChats } from "../../data";
import Input from "../ui/Input";

function ChatList({ onSelectChat }: { onSelectChat: (id: number) => void }) {
  const [search, setSearch] = useState("");
  const filteredChats = search
    ? dummyChats.filter((chat) =>
        chat.name.toLowerCase().includes(search.toLowerCase())
      )
    : dummyChats;

  return (
    <div className="w-1/4 flex flex-col bg-white p-4 border-r">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <Input
        type="search"
        placeholder="Search buddy chats"
        className="w-full p-3 mb-4 border rounded-full outline-none focus:border-2 focus:border-primary"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="p-3 cursor-pointer flex justify-between rounded-md hover:bg-gray-100"
            onClick={() => onSelectChat(chat.id)}
          >
            <h4>{chat.name}</h4>
            {chat.unread > 0 && (
              <div className="bg-secondary font-medium text-xs flex justify-center items-center w-6 h-6 rounded-full">
                <span>{chat.unread}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ChatList;
