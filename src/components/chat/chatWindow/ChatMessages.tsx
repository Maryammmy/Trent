import Image from "@/components/ui/Image";
import { IMessage } from "@/interfaces/chatInterface";
import { baseURL } from "@/services";
import { formatDateTime, formatTime12Hour } from "@/utils/formatDateAndTime";

const ChatMessages = ({ messages }: { messages: IMessage[] }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages?.map((msg) => {
        const { date, time } = formatDateTime(msg?.created_at);
        const formattedTime = formatTime12Hour(time);
        const isSender = JSON.parse(msg?.is_sender);

        return isSender ? (
          <div key={msg?.id} className="mb-2 flex flex-col gap-2 items-end">
            <p className="text-xs text-dark text-center w-full">{date}</p>
            <div className="w-[200px] h-[120px] rounded-md overflow-hidden">
              <Image
                imageUrl={baseURL + msg?.img}
                alt="chat image"
                className="w-full h-full object-cover"
              />
            </div>
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
  );
};

export default ChatMessages;
