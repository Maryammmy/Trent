import Image from "@/components/ui/Image";
import { IOwner } from "@/interfaces/chat";
import { baseURL } from "@/services";
import { Link } from "react-router-dom";
interface IProps {
  owner: IOwner;
  chatId: string | null;
}
function ChatProperty({ owner, chatId }: IProps) {
  const chattedOwner = JSON.parse(
    sessionStorage.getItem("chattedOwner") || "null"
  );
  return (
    <Link
      to={`/properties/${chatId ? owner?.prop_id : chattedOwner?.prop_id}`}
      className="flex gap-3 items-center p-2"
    >
      <div className="h-10 w-10 rounded-md overflow-hidden">
        <Image
          imageUrl={
            baseURL + (chatId ? owner?.prop_img : chattedOwner?.prop_img)
          }
          className="w-full h-full object-cover"
          alt={chatId ? owner?.prop_title : chattedOwner?.prop_title}
        />
      </div>
      <h3 className="font-semibold">
        {chatId ? owner?.prop_title : chattedOwner?.prop_title}
      </h3>
    </Link>
  );
}

export default ChatProperty;
