import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { IAddAndUpdateRating, IDeleteRating } from "@/interfaces/rating";

export const useRatingAPI = (id:string) => {
    return useQuery({
      queryKey: ["rating", id],
      queryFn: () =>
        baseAPI.get(
          `user_api/booking/get_all_rating.php?prop_id=${id}`
        ),
      enabled: !!id,
    });
  };
  export const addAndUpdateRatingAPI = (payload:IAddAndUpdateRating) => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    const response = baseAPI.post("user_api/booking/u_rate_update.php", formData);
    return response;
  };
  export const deleteRatingAPI = (payload:IDeleteRating) => {
    const response = baseAPI.delete("user_api/booking/u_delete_rating.php", {
      data: payload
    });
    return response;
  };