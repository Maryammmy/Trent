import { Link } from "react-router-dom";
import AccountSettingsCard from "../../components/accountSettings/AccountSettingsCard";
import { accountSettingsData } from "../../data/accountSettingsData";

function AccountSettings() {
  return (
    <div className="max-w-6xl  mx-auto py-5 md:py-10 px-5 xl:px-0">
      <div>
        <h2 className="text-4xl font-semibold">Account</h2>
        <div className="flex flex-col md:flex-row gap-2 md:items-center pt-4 pb-10">
          <div className="flex items-center gap-1">
            <span className="font-medium text-xl">Omar,</span>
            <p className="text-xl">omar@gmail.com</p>
          </div>
          <Link to={`/`} className=" underline font-medium text-xl">
            Go to profile
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accountSettingsData.map((item, index) => (
          <AccountSettingsCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default AccountSettings;
