export const storeOwnerChat = (owner: { img: string; name: string }) => {
  return sessionStorage.setItem(
    "chattedOwner",
    JSON.stringify({
      img: owner?.img,
      name: owner?.name,
    })
  );
};
