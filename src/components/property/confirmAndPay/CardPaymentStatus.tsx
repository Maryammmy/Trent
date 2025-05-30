interface IProps {
  statusDescription: string;
  statusCode: string;
  orderStatus: string | null;
}

function CardPaymentStatus({
  statusCode,
  statusDescription,
  orderStatus,
}: IProps) {
  if (statusCode === "200" && orderStatus !== "PAID") {
    return null;
  }
  const isSuccess = statusCode === "200" && orderStatus === "PAID";

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
