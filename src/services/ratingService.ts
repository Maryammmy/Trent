import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import { IAddAndUpdateRating } from "@/interfaces/rating";
import { uid, currentLanguage } from "@/constants";
export const useRatingAPI = (id: string | undefined) => {
  return useQuery({
    queryKey: ["rating", id],
    queryFn: () =>
      baseAPI.get(`user_api/booking/get_all_rating.php?prop_id=${id}`),
    enabled: !!id,
  });
};
export const addAndUpdateRatingAPI = (payload: IAddAndUpdateRating) => {
  const formData = new FormData();
  Object.entries({ ...payload, uid, lang: currentLanguage }).forEach(
    ([key, value]) => {
      formData.append(key, String(value));
    }
  );
  const response = baseAPIForm.post(
    "user_api/booking/u_rate_update.php",
    formData
  );
  return response;
};
export const deleteRatingAPI = (id: string) => {
  const response = baseAPI.delete("user_api/booking/u_delete_rating.php", {
    data: { uid, lang: currentLanguage, rating_id: id },
  });
  return response;
};
