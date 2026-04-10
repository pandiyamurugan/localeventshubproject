import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBus } from "react-icons/fa";
import { FaSubway } from "react-icons/fa";
import { FaTrain } from "react-icons/fa";

export default function Analytics() {
  const [form, setForm] = useState({
    from: "",
    to: "",
  });

  const [mapUrl, setMapUrl] = useState(
    "https://www.google.com/maps?q=Chennai&output=embed"
  );

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = () => {
    if (!form.from || !form.to) return;

    const url = `https://www.google.com/maps?q=${form.from}+to+${form.to}&output=embed`;

    setMapUrl(url);
  };

  return (
    <div className="d-flex" style={{ height: "100vh", background: "#f5f5f5" }}>
      <Sidebar />

      <div className="flex-grow-1 p-3 p-md-4">
      
        <h2 style={{ fontWeight: "600" }}>Event <span style={{color:"orange"}}>Locations</span></h2>

       
        <div className="d-flex flex-column flex-md-row align-items-md-center gap-2 mt-3">
          <div className="d-flex align-items-center gap-2">
            <FaMapMarkerAlt color="red" />
            <span>Your Location -</span>
          </div>

       
          <input
            type="text"
            name="from"
            placeholder="From (e.g. Chennai)"
            className="form-control"
            value={form.from}
            onChange={handleChange}
            style={{ maxWidth: "200px" }}
          />

          
          <input
            type="text"
            name="to"
            placeholder="To (e.g. Madurai)"
            className="form-control"
            value={form.to}
            onChange={handleChange}
            style={{ maxWidth: "200px" }}
          />

          <button
            onClick={handleSubmit}
            className="btn"
            style={{
              border: "1px solid red",
              color: "red",
              padding: "8px 20px",
            }}
          >
            Get Directions
          </button>
        </div>

     
        <div className="row mt-3">
        
          <div className="col-lg-8 mb-3">
            <div
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                height: "400px",
              }}
            >
              <iframe
                title="Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={
                  mapUrl ||
                  "https://www.google.com/maps?q=Chennai&output=embed"
                }
              />
            </div>
          </div>

         
          <div className="col-lg-4 map-details">
            <div
              style={{
                background: "#fff",
                borderRadius: "10px",
                padding: "15px",
                height: "400px",
                overflowY: "auto",
              }}
            >
             
              <div className="d-flex justify-content-between border-bottom mb-3">
                <span style={{ color: "#00a884", fontWeight: "600" }}>
                  Transit
                </span>
                <span>Essentials</span>
                <span>Utility</span>
              </div>

             
              <div>
                <p style={{ fontWeight: "600" }}><FaBus className="me-2" /> Bus Stations</p>

                {[
                  "SFC Travels",
                  "Joy Alukkas / Vivek",
                  "Koyambedu Bus Terminus",
                  "Maduvinkarai Bus Stand",
                  "M.G.R Nagar",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between border-bottom py-2"
                  >
                    <span>{item}</span>
                    <span style={{ color: "gray", fontSize: "14px" }}>
                      {Math.floor(Math.random() * 8) + 1} km |{" "}
                      {Math.floor(Math.random() * 30) + 5} mins
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <p style={{ fontWeight: "600" }}> <FaSubway className="me-2" />Metro Stations</p>
              </div>

              <div className="mt-3">
                <p style={{ fontWeight: "600" }}><FaTrain className="me-2" /> Train Stations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}