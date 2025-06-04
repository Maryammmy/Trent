import { useInfiniteQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { IHomeDataParams } from "../interfaces/landing";
import { currentLanguage, ITEMS_PER_PAGE, uid } from "@/constants";

export const useHomeDataAPI = (
  params?: IHomeDataParams
  // enabled: boolean = false
) => {
  const queryParamsObject: Record<
    string,
    string | number[] | string[] | number | boolean
  > = {
    lang: currentLanguage,
    ...params,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(queryParamsObject).filter(([, value]) => !!value)
  );
  return useInfiniteQuery({
    queryKey: ["properties", filteredParams],
    queryFn: ({ pageParam = 1 }) =>
      baseAPI.get("user_api/u_home_data.php", {
        params: {
          ...filteredParams,
          page: pageParam,
          facilities: JSON.stringify(filteredParams.facilities),
          uid,
          items_per_page: ITEMS_PER_PAGE,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      const size = lastPage?.data?.data?.property_list?.length || 0;
      return size === ITEMS_PER_PAGE ? allPages.length + 1 : undefined;
    },

    initialPageParam: 1,
    // enabled,
    // staleTime: 5 * 60 * 1000,
  });
};
