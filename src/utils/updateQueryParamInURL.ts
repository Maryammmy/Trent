export function updateQueryParamInURL(paramName: string, paramValue: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(paramName, paramValue);
  window.history.replaceState({}, "", url.toString());
}
