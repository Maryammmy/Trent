import { baseAPI } from ".";

export const addPropertyAPI = (payload: unknown) => {
  const response = baseAPI.post("user_api/u_property_add.php", payload);
  return response;
};
export const editPropertyAPI = (payload: unknown) => {
  const response = baseAPI.post("user_api/u_property_edit.php", payload);
  return response;
};
