import React, { useState, useMemo, useEffect } from "react";
import Latestevents from "../images/homesection1.webp";
import Latestevents22 from "../images/homesection2.png";
import Latestevents23 from "../images/homesection3.webp";
import Latestevents24 from "../images/homesection4.jpg";
import Latestevents25 from "../images/homesection5.webp";
import Latestevents26 from "../images/homesection6.webp";


import AOS from "aos";
import "aos/dist/aos.css";

function LastEvents() {
  const [visible, setVisible] = useState(6);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

 const groupEvents = useMemo(() => [
  {
    image: Latestevents,
    date: "Nov 18, 2023",
    city: "New York, NY",
    category: "Design",
    work: "Remote",
    heading: "Product Design New York event",
    description: "Sit gravida felis purus egestas sem tellus",
  },
  {
    image: Latestevents22,
    date: "Nov 18, 2023",
    city: "San Francisco, CA",
    category: "Design",
    work: "Remote",
    heading: "UX Design Meetup",
    description: "Sit gravida felis purus egestas sem tellus",
  },
  {
    image: Latestevents23,
    date: "Nov 18, 2023",
    city: "Chicago, IL",
    category: "Design",
    work: "Remote",
    heading: "UI Conference",
    description: "Sit gravida felis purus egestas sem tellus",
  },
  {
    image: Latestevents24,
    date: "Nov 18, 2023",
    city: "Boston, MA",
    category: "Design",
    work: "Remote",
    heading: "Design Thinking Workshop",
    description: "Sit gravida felis purus egestas sem tellus",
  },
  {
    image: Latestevents25,
    date: "Apr 18, 2024",
    city: "New York, NY",
    category: "Music",
    work: "Remote",
    heading: "Music Production Workshop",
    description: "Learn beat making and mixing from industry experts",
  },
  {
    image: Latestevents26,
    date: "May 02, 2024",
    city: "Chicago, IL",
    category: "Music",
    work: "Onsite",
    heading: "Open Mic Music Meetup",
    description: "Perform your music live and connect with fellow artists",
  }
], []);

  const visibleEvents = groupEvents.slice(0, visible);

  return (
    <div className="container py-5 my-5" data-aos="fade-up">

     
      <h2 className="text-center fw-bold mb-5">
        Latest <span className="text-danger">Events</span>
      </h2>

     
      <div className="row g-4">

        {visibleEvents.map((item, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-lg-4"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="card h-100 shadow-sm border-0 hover-shadow">

             
              <div className="position-relative">
                <img
                  src={item.image}
                  alt={item.heading}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />

               
                <div className="position-absolute top-0 start-0 m-3 d-flex gap-2">
                  <span className="badge bg-danger">
                    {item.category}
                  </span>
                  <span className="badge bg-light text-dark shadow-sm">
                    {item.work}
                  </span>
                </div>
              </div>

             
              <div className="card-body">
                <div className="d-flex justify-content-between text-muted small mb-2">
                  <span>{item.date}</span>
                  <span>{item.city}</span>
                </div>

                <h5 className="fw-semibold">
                  {item.heading}
                </h5>

                <p className="text-muted small mb-0">
                  {item.description}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>

     
      {visible < groupEvents.length && (
        <div className="text-center mt-5">
          <button
            onClick={() => setVisible(groupEvents.length)}
            className="btn btn-danger px-4 py-2 rounded-pill"
          >
            See All
          </button>
        </div>
      )}

    </div>
  );
}

export default LastEvents;