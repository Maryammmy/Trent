import { IframeHTMLAttributes } from "react";

type IProps = IframeHTMLAttributes<HTMLIFrameElement>;

const Iframe = ({ ...rest }: IProps) => {
  return (
    <iframe
      className="h-[200px] md:h-[400px] lg:h-[450px]"
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2341202.682369471!2d30.685574030081366!3d26.49638268138496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1738238392472!5m2!1sen!2seg"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      width="600"
      height="450"
      style={{ border: 0, borderRadius: "10px" }}
      {...rest}
    />
  );
};

export default Iframe;
