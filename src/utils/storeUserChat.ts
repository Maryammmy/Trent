import { IOwner } from "@/interfaces/chat";

export const storeOwnerChat = (owner: IOwner) => {
  return sessionStorage.setItem(
    "chattedOwner",
    JSON.stringify({
      receiver_image: owner?.receiver_image,
      receiver_name: owner?.receiver_name,
      prop_id: owner?.prop_id,
      prop_title: owner?.prop_title,
      prop_img: owner?.prop_img,
    })
  );
};
