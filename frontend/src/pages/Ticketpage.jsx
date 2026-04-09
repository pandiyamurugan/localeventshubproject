import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ticketbooking from "../images/ticketbooking.webp"
import BASE_URL from "../api";


export default function Ticket() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/bookings/${id}`)
      .then((res) => res.json())
      .then((data) => setBooking(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!booking) {
    return (
      <div className="text-center mt-5">
        <p>Loading ticket...</p>
      </div>
    );
  }

  return (
    <div style={{background:"black"}}>
       <div className="container pt-5" >
      <h2 className="text-center text-white">Ticketbooking <span style={{color:"orange"}}>Successfully</span></h2>
      <div className="row">
        <div className="col-lg-6 mx-auto my-5">
         <div>
              <div className="card shadow-lg p-4 tickets-booking">
        <div style={{width:"100%",height:"300px"}}>
          <img src={Ticketbooking} style={{height:"100%",width:"100%",objectFit:"cover"}}/>
        </div>

      

        <h3 className="text-center text-success mb-4">
        
        </h3>

        <p className="d-flex justify-content-between">
          <strong style={{color:"orange"}}>Event:</strong> {" "}
          <strong style={{color:"white"}}>{booking.eventId?.title || "N/A"}</strong>
        </p>

        <p className="d-flex justify-content-between">
          <strong style={{color:"orange"}}>Seats:</strong>{" "}
          <strong style={{color:"white"}}>{booking.seats?.length ? booking.seats.join(", ") : "N/A"}</strong>
         
        </p>

        <p className="d-flex justify-content-between">
          <strong style={{color:"orange"}}>From:</strong>{" "}
          <strong style={{color:"white"}}>{booking.from || "N/A"}</strong>
        </p>

        <p className="d-flex justify-content-between">
          <strong style={{color:"orange"}}>To:</strong>{" "}
          <strong className="text-white">{booking.to || "N/A"}</strong>
        </p>

        <hr />

        <p className="text-center text-white">
          Thank you for booking 
        </p>

      </div>
         </div>
        </div>
      </div>

   

    </div>
    </div>
   
  );
}