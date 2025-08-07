interface IProps {
  statusDescription: string;
  statusCode: string;
  orderStatus: string | null;
  paymentMethod: string;
}

function CardPaymentStatus({
  statusCode,
  statusDescription,
  orderStatus,
  paymentMethod,
}: IProps) {
  const isSuccess = statusCode === "200" && orderStatus === "PAID";

  const isError =
    statusDescription && statusCode && !orderStatus && paymentMethod === "CARD";

  if (!isSuccess && !isError) {
    return null;
  }

  return (
    <div
      className={`font-semibold p-4 rounded lg:mt-5 ${
        isSuccess ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
      }`}
    >
      {statusDescription}
    </div>
  );
}

export default CardPaymentStatus;
