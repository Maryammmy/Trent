import { useBookingDetailsAPI } from "@/services/bookingService";
import { useParams } from "react-router-dom";

function Booking() {
  const { id } = useParams();
  const { data, isLoading, error } = useBookingDetailsAPI(id);

  const booking = data?.data?.data?.Booking_details;

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!booking) return <p>No booking data found.</p>;

  return (
    <div>
      <h2>Booking Details</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <p>
          <strong>Title:</strong> {booking.prop_title}
        </p>
        <p>
          <strong>Booking Date:</strong> {booking.book_date}
        </p>
        <p>
          <strong>Status:</strong> {booking.book_status}
        </p>
        <p>
          <strong>Check-in:</strong> {booking.check_in}
        </p>
        <p>
          <strong>Check-out:</strong> {booking.check_out}
        </p>
        <p>
          <strong>Number of Guests:</strong> {booking.noguest}
        </p>
        <p>
          <strong>Price per Property:</strong> {booking.prop_price}
        </p>
        <p>
          <strong>Subtotal:</strong> {booking.subtotal}
        </p>
        <p>
          <strong>Total:</strong> {booking.total}
        </p>
        <p>
          <strong>Rate:</strong> {booking.rate}
        </p>
        <p>
          <strong>Cancel Reason:</strong> {booking.cancle_reason || "N/A"}
        </p>
      </div>

      <button onClick={handlePrint}>🖨️ Print Booking Details</button>
    </div>
  );
}

export default Booking;
