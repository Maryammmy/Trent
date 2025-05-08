export interface IAddAndUpdateRating {
  booking_id: string;
  rating: number;
  comment?: string;
}
export interface IDeleteRating {
  uid: string;
  rating_id: string;
  lang: string;
}
