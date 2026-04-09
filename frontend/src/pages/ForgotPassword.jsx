import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { MdEmail } from "react-icons/md";
import BannerImage1 from "../images/bannerimage2.webp"
import BASE_URL from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log(res.status);
console.log(data);

      if (res.ok) {
        toast.success("OTP sent to email");
        setTimeout(() => navigate("/verify-otp", { state: { email } }), 1500);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error("Error");
    }
  };

  return (
    <div className="bg-dark" >
      <div className="container">
        
      <ToastContainer />
      <div className="row min-vh-100 d-flex justify-content-center align-items-center">
        <div className="col-lg-6 col-md-6 col-12 forgot-cards p-5">
          <h3 className="text-white">Forgot <strong style={{color:"orange"}}>Password</strong></h3>

      <form onSubmit={handleSendOtp}>
        <div style={{ position: "relative" }}>
          <input
            type="email"
            placeholder="Email"
            className="form-control custom-input my-4 p-3 white-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderRadius: "10px",
              border: "2px solid orange",
              background: "#ffa5002b",
              color: "white",
              paddingRight: "40px"
            }}
          />
        
          <MdEmail
          size={30}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              pointerEvents: "none"
            }}
          />
        </div>
        

         <button
              className="btn gradient-btn w-100 p-3"
              style={{background:"orange",borderRadius:"50px",color:"white",fontWeight:"bold",fontSize:"15px",textTransform:"uppercase"}}
            >
              Send OTP
            </button>

       
      </form>
        </div>
        
      </div>
     
      
    </div>
    </div>
   
  );
}