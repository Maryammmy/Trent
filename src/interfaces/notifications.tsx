import { IImage } from "./property";

export interface INotification {
  body: string;
  created_at: string;
  id: string;
  image_list: IImage[];
  is_seen: boolean;
  title: string;
}
