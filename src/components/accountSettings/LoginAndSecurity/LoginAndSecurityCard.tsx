import { ShieldQuestion } from "lucide-react";

function LoginAndSecurityCard() {
  return (
    <div className="flex-1">
      <div className=" border p-6 max-w-[400px]">
        <div className="flex flex-col gap-3 p-4">
          <div>
            <ShieldQuestion size={40} />
          </div>
          <h2 className="font-bold text-xl">Keeping your account secure</h2>
          <p className="text-secondary font-medium">
            We regularly review accounts to make sure they’re secure as
            possible. We’ll also let you know if there’s more we can do to
            increase the security of your account.
          </p>
          <p className="text-secondary font-medium">
            Learn about safety tips for{" "}
            <span className="text-primary font-semibold">guests</span> and
            <span className="text-primary font-semibold"> hosts</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginAndSecurityCard;
