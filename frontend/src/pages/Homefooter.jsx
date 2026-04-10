import React from "react";
import { FaSearch } from "react-icons/fa";

function Homefooter() {
  return (
    <footer className="bg-black text-white py-5 mt-0">
      <div className="container">
        <div className="row">

         
          <div className="col-md-3 mb-4">
            <h5 className="text-warning">Events</h5>
            <ul className="list-unstyled">
               <li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Music Events
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Food Festivals
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Workshops
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Tech Meetups
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Art Shows
  </button>
</li>
             
             
          
            </ul>
          </div>

          
          <div className="col-md-3 mb-4">
            <h5 className="text-warning">Explore</h5>
            <ul className="list-unstyled">
              <li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Upcoming Events
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Nearby Events
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Popular Events
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Free Events
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
 Online Events
  </button>
</li>
              
              
             
            </ul>
          </div>

         
          <div className="col-md-3 mb-4">
            <h5 className="text-warning">Support</h5>
            <ul className="list-unstyled">
             <li>
  <button className="text-white text-decoration-none bg-transparent border-0">
    Help Center
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Contact Us
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Privacy Policy
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  Terms
  </button>
</li>
<li>
  <button className="text-white text-decoration-none bg-transparent border-0">
  FAQ
  </button>
</li>
              
             
             
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

            
          
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Homefooter;