import { useConfidenceBookingAPI } from "@/services/conditionService";

function ConfidenceBooking() {
  const { data } = useConfidenceBookingAPI();
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.data?.data?.confidence_booking,
      }}
    />
  );
}

export default ConfidenceBooking;
