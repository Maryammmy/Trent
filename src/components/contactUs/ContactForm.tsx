import { formContactData } from "../../data/contactData";
import Button from "../ui/Button";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";

function ContactForm() {
  return (
    <div className="bg-gray-100 py-5 px-5 w-full md:w-[500px] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold py-4">
        Get started with a free quotation
      </h2>
      <form>
        {formContactData.map((item, index) => {
          const { name, label, placeholder } = item;
          return (
            <div key={index} className="flex flex-col mb-3">
              <label htmlFor={name} className="font-medium">
                {label}
              </label>
              {name === "message" ? (
                <TextArea
                  name={name}
                  placeholder={placeholder}
                  className="outline-none py-3 px-2 rounded-md resize-none focus:border focus:border-primary"
                  rows={4}
                ></TextArea>
              ) : (
                <Input
                  name={name}
                  placeholder={placeholder}
                  className="outline-none py-3 px-2 rounded-md focus:border focus:border-primary"
                />
              )}
            </div>
          );
        })}
        <Button className="my-4 py-3 rounded-md w-full bg-primary text-white font-medium">
          Sumit your request
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
