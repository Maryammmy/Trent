import Image from "../ui/Image";
import { useTranslation } from "react-i18next";
import { IDetailsProperty } from "../../interfaces/property";
import { baseURL } from "../../services";
import { MessageCircleMore } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { storeOwnerChat } from "../../utils/storeUserChat";
import { useState } from "react";
import Loader from "../loader/Loader";
import { chatListAPI } from "@/services/chatService";
import toast from "react-hot-toast";
import { IOwner } from "@/interfaces/chat";
import { uid } from "@/constants";
interface IProps {
  id: string | undefined;
  owner: IDetailsProperty["owner"];
  ownerId: string;
  propImage: string;
  title: string;
}

function HostedBy({ id, owner, ownerId, propImage, title }: IProps) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleChatNavigator = async () => {
    try {
      setLoading(true);
      const response = await chatListAPI(id);
      const ownerData: IOwner = {
        receiver_image: owner?.img,
        receiver_name: owner?.name,
        prop_img: propImage,
        prop_id: Number(id),
        prop_title: title,
      };
      storeOwnerChat(ownerData);
      const chatId: string = response?.data?.data?.chat_list?.[0]?.chat_id;
      navigate(
        `/chat?prop=${id}&user=${ownerId}${chatId ? `&chat=${chatId}` : ""}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-5">
      <div data-aos="fade-left">
        <h2 className="pb-3 font-bold text-lg">{t("hosted_by")}</h2>
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <div>
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                imageUrl={baseURL + owner?.img}
                alt="User Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="font-bold">{owner?.name}</h2>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (uid === ownerId) {
                toast.error(t("you_can't_chat_yourself"));
                return;
              }
              handleChatNavigator();
            }}
            className="flex items-center gap-1 font-medium"
          >
            {loading ? (
              <Loader />
            ) : (
              <>
                <MessageCircleMore /> ({t("ask_the_owner")})
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HostedBy;
