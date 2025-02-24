import Button from "../ui/Button";
import Image from "../ui/Image";
import { buttons } from "../../data";

function SocialAuthButtons() {
  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-500">or</p>
      <div className="flex flex-col gap-2 mt-2">
        {buttons.map((button) => (
          <Button
            key={button.id}
            className="w-full border font-semibold border-gray-300 rounded-lg py-2 px-5 flex items-center gap-2"
          >
            {typeof button.icon === "string" ? (
              <div>
                <Image
                  imageUrl={button.icon}
                  alt={`image ${button.id}`}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            ) : (
              <div>{button.icon}</div>
            )}
            <span className="text-center flex-1">{button.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SocialAuthButtons;
