import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import { uid } from "@/constants";
export const useChatListAPI = () => {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: () => baseAPI.get(`user_api/u_chat_list.php?uid=${uid}`),
    refetchInterval: 10000,
    enabled: !!uid,
  });
};
export const chatListAPI = async (id: string | undefined) => {
  const response = await baseAPI.get(
    `user_api/u_chat_list.php?uid=${uid}&prop_id=${id}`
  );
  return response;
};
export const useMessagesAPI = (chatId: string | null) => {
  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: () =>
      baseAPI.get(
        `user_api/u_chat_messages.php?chat_id=${chatId}&uid=${uid}&order_by_last_message=false`
      ),
    refetchInterval: 10000,
    enabled: !!chatId && !!uid,
  });
};
export const addChatAPI = async (payload: FormData) => {
  const response = await baseAPIForm.post("user_api/u_add_chat.php", payload);
  return response;
};
