import { uid } from "@/constants";
import { togglePropertyAPI } from "@/services/propertyService";
import { setIsloggedin } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { handleErrorMessage } from "@/utils/handleErrorMsg";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function useToggleProperty() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const toggleFav = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    prop_id: string
  ) => {
    e.preventDefault();

    if (!uid) {
      toast.error(t("fav_error"));
      dispatch(setIsloggedin(true));
      return;
    }

    try {
      const response = await togglePropertyAPI({ uid, prop_id });

      if (
        response?.data?.response_code === 200 ||
        response?.data?.response_code === 201
      ) {
        queryClient.refetchQueries({
          queryKey: ["properties"],
        });
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return { toggleFav };
}
