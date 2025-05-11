export interface IAddAndUpdateRating {
  booking_id: string;
  rating: number;
  comment?: string;
}
export interface IRating {
  booking_id: string;
  comment: string;
  id: string;
  prop_id: string;
  rating: number;
  created_at: string;
  user_name: string;
  user_img: string;
  user_reg_date: string;
}
