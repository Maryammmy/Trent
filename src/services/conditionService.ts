import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { CurrentLanguage } from "@/types";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
export const useTermsAndConditionsAPI = () => {
  return useQuery({
    queryKey: ["termsAndConditions"],
    queryFn: () =>
      baseAPI.get(
        `user_api/u_terms_and_conditions.php?lang=${currentLanguage}`
      ),
  });
};
export const usePrivacyPolicyAPI = () => {
  return useQuery({
    queryKey: ["privacyPolicy"],
    queryFn: () =>
      baseAPI.get(`user_api/u_privacy_policy.php?lang=${currentLanguage}`),
  });
};
