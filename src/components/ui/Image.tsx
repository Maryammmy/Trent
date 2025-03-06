import placeholderImage from "../../assets/iamges/placeholder.jpg";

interface IProps {
  imageUrl: string;
  alt: string;
  className: string;
  // onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

function Image({ imageUrl, alt, className }: IProps) {
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onError={(e) => (e.currentTarget.src = placeholderImage)}
    />
  );
}

export default Image;
