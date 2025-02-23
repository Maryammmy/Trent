interface IProps {
  imageUrl: string;
  alt: string;
  className: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

function Image({ imageUrl, alt, className, onError }: IProps) {
  return (
    <img src={imageUrl} alt={alt} className={className} onError={onError} />
  );
}

export default Image;
