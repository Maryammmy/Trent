import DynamicTitle from "@/components/accountSettings/DynamicTitle";
import PayoutProfileForm from "@/components/payout/payoutProfile/PayoutProfileForm";

function PayoutProfile() {
  return (
    <div className="max-w-5xl py-5 md:py-10 px-5 xl:px-20">
      <DynamicTitle title="payouts_profile" />
      <PayoutProfileForm />
    </div>
  );
}

export default PayoutProfile;
