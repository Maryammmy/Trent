import { useQuery } from "@tanstack/react-query";
import { baseAPI } from "../services";

export const useGetData = (queryKey: string[], url: string) => {
  return useQuery({
    queryKey,
    queryFn: () => baseAPI.get(url),
  });
};
