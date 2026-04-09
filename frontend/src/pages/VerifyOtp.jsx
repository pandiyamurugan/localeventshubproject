import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { toast, ToastContainer } from "react-toastify";
import BASE_URL from "../api";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("OTP verified");
      setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
    } else {
      toast.error(data.msg);
    }
  };

  return (
    <div className="bg-dark">
       <div className="container mt-0  text-center">
      <ToastContainer />
      <div className="row min-vh-100 d-flex-justify-content-center align-items-center">
        <div className="col-lg-6 col-md-6 mx-auto otp-cards p-5">
          <div>
            <h3 className="text-white">Enter <strong style={{color:"orange"}}>OTP</strong></h3>

      <form onSubmit={handleVerify}>

      <div className="d-flex justify-content-center align-items-center mt-4">
       <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "50px",
                height: "55px",
                margin: "5px",
                fontSize: "18px",
                borderRadius: "8px",
                border: "2px solid #00ffc3",
                textAlign: "center",
              }}
            />
          )}
        />
      </div>
        
         <button
              className="btn gradient-btn w-100 p-3 mt-4"
              style={{background:"orange",borderRadius:"50px",color:"white",fontWeight:"bold",fontSize:"15px",textTransform:"uppercase"}}
            >
              Verify OTP
            </button>
        {/* <button className="btn btn-success mt-4"></button> */}

      </form>
          </div>
        </div>
      </div>
      
    </div>
    </div>
   
  );
}