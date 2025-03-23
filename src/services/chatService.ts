import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import Cookies from "js-cookie";

const uid = Cookies.get("user_id");
export const useChatListAPI = (propId?: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: () =>
      baseAPI.get(
        `user_api/u_chat_list.php?uid=${uid}${
          propId ? `&prop_id=${propId}` : ""
        }`
      ),
    refetchInterval: 10000,
    enabled: enabled,
  });
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
    enabled: !!chatId,
  });
};
