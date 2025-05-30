export interface IChatList {
  chat_id: number;
  prop_id: number;
  message: string;
  receiver_image: string;
  receiver_name: string;
  receiver_id: string;
}
export interface IMessage {
  created_at: string;
  id: string;
  img: string;
  is_sender: string;
  message: string;
  receiver_id: string;
  sender_id: string;
}
export interface IOwner {
  receiver_image: string;
  receiver_name: string;
  prop_id: number;
  prop_title: string;
}
