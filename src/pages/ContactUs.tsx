import ContactInfo from "../components/contactUs/ContactInfo";
import ContactForm from "../components/contactUs/ContactForm";

function ContactUs() {
  return (
    <div>
      <div className="bg-contact-us bg-no-repeat bg-fixed bg-[length:100%_100%]  h-[30vh] md:h-[50vh] w-full">
        <div className="flex justify-center items-center h-full">
          <h2 className="text-6xl font-bold text-white">Contact Us</h2>
        </div>
      </div>
      <div className="py-10 px-5 xl:px-20 flex flex-col md:flex-row gap-10 md:gap-0 md:justify-between">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactUs;
