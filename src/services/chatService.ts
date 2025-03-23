import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import Cookies from "js-cookie";

const uid = Cookies.get("user_id");
export const useChatListAPI = () => {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: () => baseAPI.get(`user_api/u_chat_list.php?uid=${uid}`),
    refetchInterval: 10000,
  });
};

export const useMessagesAPI = (chatId: number | null) => {
  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: () =>
      baseAPI.get(`user_api/u_chat_messages.php?chat_id=${chatId}&uid=${uid}`),
    refetchInterval: 10000,
    enabled: !!chatId,
  });
};
