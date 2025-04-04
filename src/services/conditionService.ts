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
export const useCancellationPoliciesAPI = () => {
  return useQuery({
    queryKey: ["cancellationPolicies"],
    queryFn: () =>
      baseAPI.get(`user_api/u_cancellation_list.php?lang=${currentLanguage}`),
  });
};
export const useConfidenceBookingAPI = () => {
  return useQuery({
    queryKey: ["confidenceBooking"],
    queryFn: () =>
      baseAPI.get(`user_api/u_confidence_booking.php?lang=${currentLanguage}`),
  });
};
export const useGuidelinesAPI = () => {
  return useQuery({
    queryKey: ["confidenceBooking"],
    queryFn: () =>
      baseAPI.get(`user_api/u_guidelines.php?lang=${currentLanguage}`),
  });
};
