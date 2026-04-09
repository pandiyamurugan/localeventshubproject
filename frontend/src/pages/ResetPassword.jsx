import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { MdLock } from "react-icons/md";
import BASE_URL from "../api";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleReset = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Password reset success");
      setTimeout(() => navigate("/"), 1500);
    } else {
      toast.error(data.msg);
    }
  };

  return (
    <div className="bg-dark">
      <div className="container">
        <ToastContainer />

        <div className="row min-vh-100 d-flex justify-content-center align-items-center">
          <div className="col-lg-6 col-md-6 col-12 forgot-cards p-5">
            
            <h3 className="text-white">
              Reset <strong style={{ color: "orange" }}>Password</strong>
            </h3>

            <form onSubmit={handleReset}>
              
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  placeholder="New Password"
                  className="form-control custom-input my-4 p-3 white-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    borderRadius: "10px",
                    border: "2px solid orange",
                    background: "#ffa5002b",
                    color: "white",
                    paddingRight: "40px"
                  }}
                />

                <MdLock
                  size={28}
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
                style={{
                  background: "orange",
                  borderRadius: "50px",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "15px",
                  textTransform: "uppercase"
                }}
              >
                Reset Password
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}