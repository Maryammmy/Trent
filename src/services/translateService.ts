import { useQuery } from "@tanstack/react-query";
import { mymemorytranslatedBaseAPI } from ".";

export const useTranslateAPI = (text: string) => {
  return useQuery({
    queryKey: ["translate", text],
    queryFn: () =>
      mymemorytranslatedBaseAPI.get(
        `https://api.mymemory.translated.net/get?q=${text}&langpair=ar|en`
      ),
    refetchInterval: 10000,
    enabled: !!text,
  });
};
