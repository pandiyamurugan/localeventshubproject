import Banner from "../images/Bannerimage1.png";
import { useEffect } from "react";
import AOS from "aos";
import AllEvents from "./AllEvents";
import Eventscredit from "./Eventscredit";
import TechnologicalEvents from "./TechnologicalEvents";
import "aos/dist/aos.css";
// import ScrollContents from "./ScrollContents";
import Homefooter from "./Homefooter";
import ConcerteEvents from "./ConcerteEvents"

export default function Homepage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div>
      <div
      className="d-flex align-items-center text-start text-white position-relative"
      style={{
        height: "100vh",
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* DARK OVERLAY */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      ></div>

      {/* CONTENT */}
      <div className="container position-relative">
        <div className="row">
          <div className="col-12 col-md-8">

            {/* TITLE */}
            <h1
              className="fw-bold display-5"
              data-aos="fade-up"
            >
              <span className="text-danger">Bringing</span> communities together through live events.
            </h1>

            {/* DESCRIPTION */}
            <p
              className="mt-3 fs-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              LocalEventHub helps you discover what’s happening around you —
              from music nights to cultural festivals and everything in between.
            </p>

            {/* BUTTON */}
            <button
              className="btn btn-danger rounded-pill px-4 py-2 mt-3"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              Todays Events
            </button>

          </div>
        </div>
      </div>
    </div>
    <AllEvents/>
    <Eventscredit/>
  
    {/* <ScrollContents/> */}
    <ConcerteEvents/>
      <TechnologicalEvents/>
    <Homefooter/>
    </div>
    
  );
}