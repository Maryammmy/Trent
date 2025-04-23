export const storeOwnerChat = (owner: { img: string; name: string }) => {
  return sessionStorage.setItem(
    "chattedOwner",
    JSON.stringify({
      img: owner?.img,
      name: owner?.name,
    })
  );
};
export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
