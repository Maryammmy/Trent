import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import Cookies from "js-cookie";

const uid = Cookies.get("user_id");
export const useChatListAPI = () => {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: () => baseAPI.get(`user_api/u_chat_list.php?uid=${uid}`),
    refetchInterval: 10000,
    enabled: !!uid,
  });
};
export const chatListAPI = (id: string | undefined) => {
  return baseAPI.get(`user_api/u_chat_list.php?uid=${uid}&prop_id=${id}`);
};
export const useMessagesAPI = (
  chatId: number | null,
  ownerId: string | null
) => {
  return useQuery({
    queryKey: ["messages", chatId, ownerId],
    queryFn: () =>
      baseAPI.get(`user_api/u_chat_messages.php?chat_id=${chatId}&uid=${uid}`),
    refetchInterval: 10000,
    enabled: !!chatId && !!uid,
  });
};
export const addChatAPI = (payload: FormData) => {
  return baseAPIForm.post("user_api/u_add_chat.php", payload);
};
