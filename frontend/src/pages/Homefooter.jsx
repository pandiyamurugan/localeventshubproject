import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGlobe,FaSearch } from "react-icons/fa";

function Homefooter() {
  return (
    <footer className="bg-black text-white py-5 mt-0">
      <div className="container">
        <div className="row">

         
          <div className="col-md-3 mb-4">
            <h5 className="text-warning">Events</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Music Events</a></li>
              <li><a href="#" className="text-white text-decoration-none">Food Festivals</a></li>
              <li><a href="#" className="text-white text-decoration-none">Workshops</a></li>
              <li><a href="#" className="text-white text-decoration-none">Tech Meetups</a></li>
              <li><a href="#" className="text-white text-decoration-none">Art Shows</a></li>
            </ul>
          </div>

          
          <div className="col-md-3 mb-4">
            <h5 className="text-warning">Explore</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Upcoming Events</a></li>
              <li><a href="#" className="text-white text-decoration-none">Nearby Events</a></li>
              <li><a href="#" className="text-white text-decoration-none">Popular Events</a></li>
              <li><a href="#" className="text-white text-decoration-none">Free Events</a></li>
              <li><a href="#" className="text-white text-decoration-none">Online Events</a></li>
            </ul>
          </div>

         
          <div className="col-md-3 mb-4">
            <h5 className="text-warning">Support</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Help Center</a></li>
              <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
              <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-white text-decoration-none">Terms</a></li>
              <li><a href="#" className="text-white text-decoration-none">FAQ</a></li>
            </ul>
          </div>

         
          <div className="col-md-3 mb-4">
            <h4 className="text-warning">Local Events Hub</h4>

           
            <div className="search-wrapper my-3">
  <FaSearch className="search-icon" />
  <input 
    type="text" 
    placeholder="Search events..." 
    className="search-input"
  />
</div>

            
            <div className="d-flex gap-3">
              <a href="#" className="text-warning fs-5"><FaGlobe /></a>
              <a href="#" className="text-warning fs-5"><FaFacebookF /></a>
              <a href="#" className="text-warning fs-5"><FaInstagram /></a>
              <a href="#" className="text-warning fs-5"><FaTwitter /></a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Homefooter;