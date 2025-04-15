export const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/jpg",
];

export const allowedVideoTypes = [
  "video/mp4",
  "video/avi",
  "video/mov",
  "video/mkv",
];
export const merchantRefNum = (
  Math.random().toString().slice(2) + Date.now()
).slice(0, 10);
export const returnUrl = window.location.href;
export const quantity = 1;
