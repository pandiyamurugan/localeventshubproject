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
  const { id } = useParams(); // eventId
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatLayout = useMemo(() => generateSeats(), []);

  
  useEffect(() => {
    fetch(`${BASE_URL}/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.log(err));
  }, [id]);

  const toggleSeat = useCallback((seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  }, []);

  const totalAmount = selectedSeats.length * seatPrice;

 const handlePayNow = async () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("User not logged in");
    return;
  }

  const payload = {
    userId,
    eventId: id,
    seats: selectedSeats,
    totalAmount,
  };

  console.log("SENDING:", payload);

  const res = await fetch(`${BASE_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  console.log(" RESPONSE:", data);

  if (!res.ok || !data._id) {
    alert("Booking failed");
    return;
  }

  navigate(`/ticket/${data._id}`);
};

  function renderSeat(seat) {
    const isSelected = selectedSeats.includes(seat);

    return (
      <button
        key={seat}
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
    <div className="d-flex  min-vh-100 bg-light">

    
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
          <div className="screen-box">
            SCREEN THIS WAY
          </div>
        </div>

       
        <div className="seat-wrapper">

          {seatLayout.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="d-flex align-items-center justify-content-start justify-content-md-center mb-2 flex-wrap"
            >

            
              <div className="row-label">
                {rows[rowIndex]}
              </div>

            
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