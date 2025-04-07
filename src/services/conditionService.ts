import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { CurrentLanguage } from "@/types";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
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
export const useContentGuidelinesAPI = () => {
  return useQuery({
    queryKey: ["contentGuidelines"],
    queryFn: () =>
      baseAPI.get(`user_api/u_guidelines.php?lang=${currentLanguage}`),
  });
};
export const useListingGuidelinesAPI = () => {
  return useQuery({
    queryKey: ["listingGuidelines"],
    queryFn: () =>
      baseAPI.get(`user_api/u_listing_guidelines.php?lang=${currentLanguage}`),
  });
};
export const useGuestTermsAPI = () => {
  return useQuery({
    queryKey: ["guestTerms"],
    queryFn: () =>
      baseAPI.get(
        `user_api/u_terms_and_conditions.php?lang=${currentLanguage}`
      ),
  });
};
export const useGuestCancellationPoliciesAPI = () => {
  return useQuery({
    queryKey: ["guestCancellationPolicies"],
    queryFn: () =>
      baseAPI.get(
        `user_api/u_cancellation_policies.php?lang=${currentLanguage}`
      ),
  });
};
export const useHostTermsAPI = () => {
  return useQuery({
    queryKey: ["hostTerms"],
    queryFn: () =>
      baseAPI.get(
        `user_api/u_host_terms_and_conditions.php?lang=${currentLanguage}`
      ),
  });
};
export const useHostCancellationPoliciesAPI = () => {
  return useQuery({
    queryKey: ["hostCancellationPolicies"],
    queryFn: () =>
      baseAPI.get(
        `user_api/u_host_cancellation_policies.php?lang=${currentLanguage}`
      ),
  });
};
