import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import { IOwner } from "@/interfaces/chat";
import { baseURL } from "@/services";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface IProps {
  owner: IOwner;
  chatId: string | null;
}
const ChatHeader = ({ owner, chatId }: IProps) => {
  const navigate = useNavigate();
  const chattedOwner = JSON.parse(
    sessionStorage.getItem("chattedOwner") || "null"
  );
  return (
    <div className="px-2 py-4 border-b bg-white flex items-center gap-3">
      <Button className="lg:hidden" onClick={() => navigate(`/chat`)}>
        <ChevronLeft />
      </Button>
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image
          imageUrl={
            baseURL +
            (chatId ? owner?.receiver_image : chattedOwner?.receiver_image)
          }
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-lg font-semibold">
        {chatId ? owner?.receiver_name : chattedOwner?.receiver_name}
      </h2>
    </div>
  );
};

export default ChatHeader;
