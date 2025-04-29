import DynamicTitle from "@/components/accountSettings/DynamicTitle";
import PayoutProfileForm from "@/components/payout/payoutProfile/PayoutProfileForm";

function CreatePayoutProfile() {
  return (
    <div className="max-w-3xl py-5 md:py-10 px-5 xl:px-0 mx-auto">
      <DynamicTitle title="payouts_profile" />
      <PayoutProfileForm />
    </div>
  );
}

export default CreatePayoutProfile;
