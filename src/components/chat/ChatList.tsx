import { useState } from "react";
import Input from "../ui/Input";
import { useChatListAPI } from "../../services/chatService";
import { IChatList } from "../../interfaces/chatInterface";
interface IProps {
  onSelectChat: (id: number) => void;
  selectedChat: number | null;
}
function ChatList({ onSelectChat, selectedChat }: IProps) {
  const [search, setSearch] = useState("");
  const { data } = useChatListAPI();
  const chatList: IChatList[] = data?.data?.data?.chat_list;
  const filteredChats = search
    ? chatList?.filter((chat) =>
        chat?.receiver_name?.toLowerCase().includes(search.toLowerCase())
      )
    : chatList;

  return (
    <div
      className={`bg-white p-4 lg:border-r lg:w-1/3 2xl:w-1/4 ${
        selectedChat ? "hidden lg:flex lg:flex-col" : "flex flex-col w-full"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <Input
        type="search"
        placeholder="Search buddy chats"
        className="w-full p-3 mb-4 border rounded-full outline-none focus:border-2 focus:border-primary"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-1 overflow-y-auto">
        {filteredChats?.map((chat) => (
          <div
            key={chat?.chat_id}
            className="p-3 cursor-pointer flex justify-between items-center rounded-md hover:bg-gray-100"
            onClick={() => onSelectChat(chat?.chat_id)}
          >
            <h4 className="font-semibold">{chat?.receiver_name}</h4>
            <p className="text-sm text-dark font-medium">{chat?.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ChatList;
