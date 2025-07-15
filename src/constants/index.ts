import { CurrentLanguage } from "@/types";
import Cookies from "js-cookie";
export const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/jpg",
];
export const allowedVideoTypes = [
  "video/mp4",
  "video/avi",
  "video/mov",
  "video/mkv",
];
export const merchantRefNum = (
  Math.random().toString().slice(2) + Date.now()
).slice(0, 10);
// export const paymentExpiry = Date.now() + 60 * 60 * 1000;
export const quantity = 1;
export const fawryPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSSwxjXfzTwgkv
KlBt1uO+BmXtNogAG3FH1WaSF5twMdM8paUu9ez/tvIzKjclvie4B53705H+5fp4
NXtSFnEYPCm3V6sX83pY/BInIxkCdfBR4cjTd2Vs6qZF28adjYZV5zbOdyrx08kH
TvHkiRVjOnes4dpX+p799tYGFUYwPvXN6NtdIjTj/aPrwkA5sptXg2uWpuuAlhJC
JSiAfbmYabRhDi9Mpq2YYa5xL6W8PrkktBxzBUaSk77RfJ/psSeEb596tgvrTKqX
c4lspZZ1dPq2aW7hQXaTVzxdFLMzi3g9PiWk07EUv5K7pEe/wJX2FGlwIxQQ4Z+m
64usEcRrAgMBAAECggEAGr31ScTIjr0NiL2nbiy1/OqWf0JUohBiKMttsI74Lw4s
mw18oJT7+dKre4bgBdo40H8z9fC642mO26KLJHpNuixlQ8qW0A4F83ZAqz7TN4vv
nkgzudQ9iidqtaJzMCHKyLE3Z46JHyOjv95CgZA9hKIPdl7i1upNXgddIEeLSQ4y
gQXhZlbEKSSl4n/BYNRJAZge2M9eXX3CiR+J8NXVvIZUUkBsp2W15Y9nwDf+emOV
ZI8wpFpn/7hPe5N/DcmCFZvaO1nm2O8VIFPR+hBQMf+YT9fC35hok7gTmRhR2ZQJ
JVKe+aQ+G1XaRDCRnZD3Yk2wCaHNUxSR0ycdbV4roQKBgQDHCCjqD4LfaIf+AuY/
uBqYaOX7yaNIR3FBOtGdKooAMbuNbt/791ou5gE7RVnfVsH3JfZcXhRbeKKMz0x8
gOTAQqUMlQNNrIDPP9H7Bh5LrjBW0U6CC+tNrC91kBgWaJaOb8lgelJmqlvKIZID
EuE1Cc6xJpGe2OazZ+vc4dX3jwKBgQC8KoR8Mlohbe/mNKQwXDSQWrfA+6L7anXu
tmwCpucE02dyERtVcR0HN5sO6ol5E00RJIJRqCaW8p3fnMAF+m/r2UxqOlD/UTfE
yhAc2TAk3PvD9dtby2/MgDqCpsflffz5rApCz1GvoMDVH4YihlpxhVYqqyRpvv3P
RpYFtWLXZQKBgQCzjMbsMEYOKQzVt+PjA8DqUWd4N7UXlWu0Ps2ujRulhTf/JVDm
y4QN3uypfazP8EJXJWYUecK/qhpqEPCdOOIkF3sx2JP8VGx3islxPVnDSEbPa075
vqrtjTHbSryQKpX3tRzj7jW77F+V/6brIvMLl+dgpLylomKs4klDIHCYPQKBgBJW
hnDgK16Eq1OhH7tC0TCcVrotC/Y6quGnz6D2iR80RymbtzE9g9m3NppeiyVMlz8r
crPoklI1tOMdEK3EeXHfzI2xv0EStj+sfaOCGyoMi1DOviEVE4E3ofwnquWXwLbI
aHuYXtqh7QkYOGdW9quHlh00bqkLnwq7U1WdFtPtAoGAD9DFF5lx673cE46ri1QI
oraJBXFOZTJljA3fgxClhuTJjxZm/6Oq7VyhPAAQnbf/vitJR8NzRzqqE6kziQ95
LbpJXW+DAQhXH17Uc487JOJpM2A3FSsmmAQB+D82Qpg6wdpws2bT5NT50RpFqUnB
jzDFH18sj1q1ggmu6J4J03A=
-----END PRIVATE KEY-----`;
export const paymentExpiry = new Date(
  Date.now() + 12 * 60 * 60 * 1000
).getTime();
export const ITEMS_PER_PAGE = 12;
export const uid = Cookies.get("user_id") || "";
export const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
export const websiteUrl = "https://trent.com.eg";
export const DEFAULT_CURRENCY = { currency: "EGP", rate: "1" };
export const getOwnerFees = (): string => {
  return Cookies.get("owner_fees") || "";
};
