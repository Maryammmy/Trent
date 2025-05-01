interface IProps {
  statusDescription: string;
  statusCode: string;
}
function CardPaymentStatus({ statusCode, statusDescription }: IProps) {
  return (
    <div
      className={`font-semibold p-4 rounded lg:mt-5 ${
        statusCode === "200"
          ? "text-green-600 bg-green-100"
          : "text-red-600 bg-red-100"
      }`}
    >
      {statusDescription}
    </div>
  );
}

export default CardPaymentStatus;
