import { useQuery } from "@tanstack/react-query";
import { mymemorytranslatedBaseAPI } from ".";

export const useTranslateAPI = (text: string) => {
  return useQuery({
    queryKey: ["translate", text],
    queryFn: () =>
      mymemorytranslatedBaseAPI.get(
        `get?q=${text}&langpair=ar|en&de=mariam@catalyst.com.eg`
      ),
    enabled: !!text,
  });
};
