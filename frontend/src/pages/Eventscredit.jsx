import React from "react";

import Oursiconic1 from "../images/Eventsholding1.jpg";
import Oursiconic2 from "../images/Eventsholding2.webp";
import Oursiconic3 from "../images/Eventsholding3.webp";
import Oursiconic4 from "../images/Eventsholding4.webp";
import Oursiconic5 from "../images/Eventsholding5.jpg";
import Oursiconic6 from "../images/Eventsholding6.jpg";


function Eventscredit() {
  const ourmultipleevents = [
    { images: Oursiconic1 },
    { images: Oursiconic2 },
    { images: Oursiconic3 },
    { images: Oursiconic4 },
    { images: Oursiconic5 },
    { images: Oursiconic6 },
    
  ];

  return (
    <div className="container my-5" data-aos="fade-up">

      <div className="row g-4 align-items-center">

        {/* LEFT SIDE */}
        <div className="col-12 col-md-5">

          <div className="p-3 bg-white shadow rounded">

            <h2 className="fw-bold mb-3" data-aos="fade-right">
              Event <span className="text-danger">Details</span>
            </h2>

            <p className="text-muted" data-aos="fade-right">
              This event brings together people from different backgrounds to enjoy an exciting and memorable experience filled with entertainment, learning, and meaningful connections. Whether you are attending for fun, networking, or personal growth, this event is designed to offer something valuable for everyone.
            </p>

            <p className="text-muted" data-aos="fade-right">
              The event will take place at a well-equipped venue that is easily accessible and offers a comfortable and safe environment for all attendees. Food and refreshments will be available throughout the event.
            </p>

          </div>
        </div>

      
        <div className="col-12 col-md-7 overflow-hidden">

          <div className="d-flex animate-scroll-x">

            {[...ourmultipleevents, ...ourmultipleevents].map((item, index) => (
              <div
                key={index}
                className="card mx-2 shadow-sm border-0 flex-shrink-0"
                style={{ width: "200px" }}
                data-aos="zoom-in"
              >
                <img
                  src={item.images}
                  alt="Event"
                  className="card-img-top"
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Eventscredit;