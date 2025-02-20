import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";

export const useUserConversationAPI = () => {
  return useQuery({
    queryKey: ["useUserConversationAPI", id],
    queryFn: () => baseAPI.get(`messaging/messages/user/${id}`),
  });
};
