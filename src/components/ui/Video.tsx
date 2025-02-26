import { VideoHTMLAttributes } from "react";

interface IProps extends VideoHTMLAttributes<HTMLVideoElement> {
  videoUrl: string;
  className?: string;
}

function Video({ videoUrl, className }: IProps) {
  return (
    <video controls autoPlay className={className}>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default Video;
