import TrentLogo from "../../assets/iamges/Trent-logo-pdf.png";

interface IProps {
  imageUrl: string;
  alt: string;
  className: string;
}

function Image({ imageUrl, alt, className }: IProps) {
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = TrentLogo;
      }}
    />
  );
}

export default Image;
