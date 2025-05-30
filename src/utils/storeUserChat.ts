export const storeOwnerChat = (owner: {
  img: string;
  name: string;
  prop_id: string | undefined;
  title: string;
  prop_image: string;
}) => {
  return sessionStorage.setItem(
    "chattedOwner",
    JSON.stringify({
      img: owner?.img,
      name: owner?.name,
      prop_id: owner?.prop_id,
      title: owner?.title,
      prop_image: owner?.prop_image,
    })
  );
};
export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
