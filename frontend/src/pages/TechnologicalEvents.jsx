import React from "react";
import Musicalevents from "../images/movieslist03.jpg";
import Bannertwo from "../images/Banner-2.png";

function TechnologyEvents() {
  return (
    <div
      className=""
     
    >
      <div className="container py-5">
        <div className="row align-items-center py-5">

       
          <div className="col-12 col-md-6 mb-4 mb-md-0 text-center" >
            <img
              src={Musicalevents}
              alt="Events"
               data-aos="fade-right"
              className="img-fluid rounded shadow d-none d-md-block"
            />
          </div>

          
          <div className="col-12 col-md-6 text-white py-5">
            <span className="text-uppercase fw-bold text-primary d-block mb-2" data-aos="fade-up"
        data-aos-delay="300">
              Why Meetups
            </span>

            <h2 className="fw-bold mb-3 text-black">
              Discover More than 3000+ technology Events
            </h2>

            <p className="mb-4 text-black">
              Connect with innovators, developers, and industry leaders from
              around the world. Attend workshops, conferences, and networking
              sessions to grow your skills and expand your professional network.
            </p>

            <div className="d-flex gap-3 flex-wrap"  data-aos="fade-up"
          data-aos-delay="600">
              <button className="btn btn-danger px-4 py-2">
                Explore Events
              </button>

              <button className="btn btn-outline-dark px-4 py-2">
                Learn More
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TechnologyEvents;