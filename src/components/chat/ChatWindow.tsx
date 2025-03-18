import { useState } from "react";
import { dummyChats, dummyMessages } from "../../data";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Image from "../ui/Image";
import { ChevronLeft } from "lucide-react";

function ChatWindow({
  chatId,
  selectedChat,
  onClose,
}: {
  chatId: number | null;
  selectedChat: number | null;
  onClose: () => void;
}) {
  const [newMessage, setNewMessage] = useState("");
  const chat = dummyChats.find((c) => c.id === chatId);
  const messages = dummyMessages[chatId as number] || [];

  return chatId ? (
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
        <h2 className="text-lg font-semibold">{chat?.name}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) =>
          msg.sender ? (
            <div key={index} className="mb-2 flex flex-col gap-1">
              <p className="text-xs text-gray-400 text-center">{msg.time}</p>
              <p className="font-medium">{msg.sender}</p>
              <p className="bg-white w-fit rounded-md rounded-tl-none  p-2 shadow">
                {msg.text}
              </p>
            </div>
          ) : (
            <div key={index} className="mb-2 flex flex-col gap-1 items-end">
              <p className="text-xs text-gray-400 text-center w-full">
                {msg.time}
              </p>
              <p className="bg-white w-fit rounded-md rounded-tr-none  p-2 shadow">
                {" "}
                {msg.text}
              </p>
            </div>
          )
        )}
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
