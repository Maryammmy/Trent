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
        e.currentTarget.src = "/images/Trent-logo-pdf.png";
      }}
    />
  );
}

export default Image;
