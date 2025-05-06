 export interface IAddAndUpdateRating {
    uid:string;
    booking_id:string;
    rating:number;
    comment:string;
    lang:string
}
export interface IDeleteRating{
    uid: string,
    rating_id : string ,
    lang : string,
}