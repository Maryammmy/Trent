import { ReactElement } from "react";
import { PhotoView } from "react-photo-view";

interface IProps {
  children: ReactElement;
  src: string;
}
function PhotoViewer({ children, src }: IProps) {
  return <PhotoView src={src}>{children}</PhotoView>;
}

export default PhotoViewer;
