import { useSearchParams } from "react-router-dom";

export const useQueryParam = (param: string): string | null => {
  const [searchParams] = useSearchParams();
  return searchParams.get(param);
};
