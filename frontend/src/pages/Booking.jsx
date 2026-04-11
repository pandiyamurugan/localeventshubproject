import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BASE_URL from "../api";

const seatPrice = 200;

// Generate rows A-Z
const rows = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

// Generate seat layout
const generateSeats = () => {
  return rows.map((row) =>
    Array.from({ length: 12 }, (_, i) => `${row}${i + 1}`)
  );
};

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatLayout = useMemo(() => generateSeats(), []);

  // Fetch event
  useEffect(() => {
    fetch(`${BASE_URL}/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.log(err));
  }, [id]);

  // Seat toggle
  const toggleSeat = useCallback((seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  }, []);

  const totalAmount = selectedSeats.length * seatPrice;

  // PAYMENT FLOW
  const handlePayNow = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Please select seats");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay not loaded");
      return;
    }

    try {
      // CREATE ORDER
      const orderRes = await fetch(`${BASE_URL}/api/bookings/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const order = await orderRes.json();

      if (!orderRes.ok || !order.id) {
        alert("Order creation failed");
        console.log(order);
        return;
      }

      // OPEN RAZORPAY
      const options = {
        key: "rzp_test_Sc7CWyZygD9Hbm",
        amount: order.amount,
        currency: "INR",
        name: "Ticket Booking",
        description: "Event Ticket",
        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              `${BASE_URL}/api/bookings/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId,
                  eventId: id,
                  seats: selectedSeats,
                  totalAmount,
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                }),
              }
            );

            const data = await verifyRes.json();

            if (!verifyRes.ok) {
              alert("Payment verification failed");
              console.log(data);
              return;
            }

            navigate(`/ticket/${data._id}`);
          } catch (err) {
            console.log(err);
            alert("Verification error");
          }
        },

        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
          },
        },

        prefill: {
          name: "User",
          email: "test@gmail.com",
        },

        theme: {
          color: "#ff6600",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  // Render seat
  function renderSeat(seat) {
    const isSelected = selectedSeats.includes(seat);

    return (
      <button
        key={seat}
        type="button"
        onClick={() => toggleSeat(seat)}
        className={`btn btn-sm seat-btn ${
          isSelected ? "btn-danger" : "btn-outline-secondary"
        }`}
      >
        {seat.slice(1)}
      </button>
    );
  }

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />

      <main className="flex-grow-1 p-3 p-md-4">
        <h3 className="text-center fw-bold mb-2">
          Seat <span style={{ color: "orange" }}>Reservation</span>
        </h3>

        <p className="text-center mb-4">
          Event:{" "}
          <b className="text-danger">
            {event?.title || "Loading..."}
          </b>
        </p>

        <div className="text-center mb-4">
          <div className="screen-box">SCREEN THIS WAY</div>
        </div>

        <div className="seat-wrapper">
          {seatLayout.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="d-flex align-items-center justify-content-center mb-2 flex-wrap"
            >
              <div className="row-label">{rows[rowIndex]}</div>

              <div className="seat-group">
                {row.slice(0, 4).map(renderSeat)}
                <div className="seat-gap"></div>
                {row.slice(4, 8).map(renderSeat)}
                <div className="seat-gap"></div>
                {row.slice(8, 12).map(renderSeat)}
              </div>
            </div>
          ))}
        </div>

        <div className="summary-box">
          <div>
            <p className="mb-1">
              Selected Seats:{" "}
              <b>{selectedSeats.join(", ") || "None"}</b>
            </p>
            <p className="mb-0">
              Total Amount: <b>₹{totalAmount}</b>
            </p>
          </div>

          <button
            type="button"
            className="btn btn-danger px-4"
            disabled={selectedSeats.length === 0}
            onClick={handlePayNow}
          >
            Pay Now ₹{totalAmount}
          </button>
        </div>
      </main>
    </div>
  );
}