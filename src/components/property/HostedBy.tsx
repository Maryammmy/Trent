import Image from "../ui/Image";
import { useTranslation } from "react-i18next";
import { IDetailsProperty } from "../../interfaces/property/propertyInterface";
import { baseAPI, baseURL } from "../../services";
import { MessageCircleMore } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { storeOwnerChat } from "../../utils/storeUserChat";
import { useState } from "react";
import Loader from "../loader/Loader";
import Cookies from "js-cookie";

const uid = Cookies.get("user_id");
interface IProps {
  id: string;
  owner: IDetailsProperty["owner"];
  guestRules: string;
  ownerId: string;
}
function HostedBy({ id, owner, guestRules, ownerId }: IProps) {
  const [loading, setLoading] = useState(false);
  // const [enabled, setEnabled] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const { data } = useChatListAPI(id, enabled);
  // const chatId: string = data?.data?.data?.chat_list?.[0]?.chat_id;
  // console.log(data);
  const handleChatNavigator = async () => {
    setLoading(true);
    try {
      const response = await baseAPI.get(
        `user_api/u_chat_list.php?uid=${uid}&prop_id=${id}`
      );
      storeOwnerChat(owner);
      const chatId: string = response?.data?.data?.chat_list?.[0]?.chat_id;
      navigate(`/chat?user=${ownerId}${chatId ? `&chat=${chatId}` : ""}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-b py-4">
      <div className="flex items-center gap-5" data-aos="fade-left">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            imageUrl={baseURL + owner?.img}
            alt="User Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-bold">
            {t("hosted_by")} {owner?.name}
          </h2>
        </div>
        <Button onClick={handleChatNavigator}>
          {loading ? <Loader /> : <MessageCircleMore />}
        </Button>
      </div>
      <div className="flex flex-col gap-1 pt-4" data-aos="fade-left">
        <h3 className="font-bold">{t("host_rules")}</h3>
        <p className="text-dark font-medium">{guestRules}</p>
      </div>
    </div>
  );
}

export default HostedBy;
