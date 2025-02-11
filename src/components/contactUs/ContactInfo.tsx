import { contactInfo } from "../../data/contactData";

function ContactInfo() {
  return (
    <div className="max-w-[600px]">
      <h2 className="font-bold text-3xl">Get in touch</h2>
      <div className="font-medium text-lg border-b-2">
        <p className="py-3">
          Use our contact form for all information requests pr contact us
          directly using the contact information below
        </p>
        <p className="pt-2 pb-6">
          Feel free to get in touch with us via email or phone
        </p>
      </div>
      <div className="pt-5">
        <ul className="flex flex-col gap-5">
          {contactInfo.map((item, index) => {
            const { title, text, icon } = item;
            return (
              <li key={index} className="flex gap-3 items-center">
                <div>{icon}</div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-dark font-medium">{text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ContactInfo;
