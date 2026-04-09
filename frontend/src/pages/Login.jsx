import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";

import { useFormik } from "formik";
import * as Yup from "yup";
import BASE_URL from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://i0.wp.com/www.thestartupfounder.com/wp-content/uploads/2022/10/image-227.png?resize=886%2C575&ssl=1",
    "https://endeavor.org/wp-content/uploads/2024/04/EventsSS.webp",
    "https://www.novoteltangerang.com/wp-content/uploads/sites/55/2023/12/Featured-image-meeting.jpg",
    "https://www.shutterstock.com/shutterstock/videos/1081612943/thumb/5.jpg?ip=x480"
  ];

  // const nextImage = () => {
  //   setCurrentIndex((prev) => (prev + 1) % images.length);
  // };

  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("userId", data.userId);
           localStorage.setItem("userName", data.name);
          

          toast.success("Login Successfully");

          setTimeout(() => {
            if (data.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/dashboard");
            }
          }, 1500);
        } else {
          toast.error(data.msg || "Login failed");
        }
      } catch (error) {
        toast.error("Server error");
      }
    },
  });

  return (
    <div className="login-bg d-flex align-items-center justify-content-center">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="login-card row overflow-hidden">

        <div className="col-md-12 p-5 d-flex flex-column justify-content-center text-white">

          <h2 className="fw-bold mb-2">
            Login Your <span style={{ color: "orange" }}> Account</span>
          </h2>
          <p className="mb-4 text-light">
            Login to continue your journey
          </p>

          <form onSubmit={formik.handleSubmit}>

           
            <div style={{ position: "relative" }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control custom-input mb-3 p-3 white-input"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  borderRadius: "10px",
                  border:"none",
                  borderBottom: "2px solid orange",
                  background: "#ffa5000f",
                  color: "white",
                  paddingRight: "40px"
                }}
              />

              <MdEmail size={30} style={iconStyle}  /> 
            </div>
             {formik.touched.email && formik.errors.email && (
                <div className="text-danger small mb-1">
                  {formik.errors.email}
                </div>
              )}

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-control custom-input mb-3 p-3 white-input"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={inputStyle}
              />

              <div
                onClick={() => setShowPassword(!showPassword)}
               
              >
                {showPassword ? <FaEyeSlash  style={eyeStyle} size={30} /> : <FaEye  style={eyeStyle} size={30} />}
              </div>
            </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger small mb-1">
                  {formik.errors.password}
                </div>
              )}

           
            <div className="text-end mb-3">
              <span
                onClick={() => navigate("/forgot-password")}
                style={{
                  cursor: "pointer",
                  color: "orange",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}
              >
                Forgot Password?
              </span>
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
              Login
            </button>

          </form>

        
          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1 border-light" />
            <span className="mx-2">OR</span>
            <hr className="flex-grow-1 border-light" />
          </div>

          <div className="d-flex gap-3 justify-content-center">
            <div className="social-btn"><FaFacebookF /></div>
            <div className="social-btn"><FaTwitter /></div>
            <div className="social-btn"><FaGoogle /></div>
            <div className="social-btn"><FaLinkedinIn /></div>
          </div>

          <p className="mt-4 text-center">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="ms-2 fw-bold text-warning"
              style={{ cursor: "pointer" }}
            >
              Register
            </span>
          </p>

        </div>

      
       

      </div>
    </div>
  );
}


const inputStyle = {
  borderRadius: "10px",
     border:"none",
     borderBottom: "2px solid orange",
  background: "#ffa5000f",
  color: "white",
  paddingRight: "40px"
};

const iconStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%) scale(1)",
  color: "white",
  background: "linear-gradient(135deg, orange, #ff6600)",
  padding: "6px",
  border: "2px solid white",
  borderRadius: "50%",
  boxShadow: "0 0 8px rgba(255,165,0,0.8)",
  transition: "all 0.3s ease",
  animation: "pulseGlow 1.5s infinite",
  cursor: "pointer"
};

const eyeStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%) scale(1)",
  color: "white",
  background: "linear-gradient(135deg, orange, #ff6600)",
  padding: "6px",
  border: "2px solid white",
  borderRadius: "50%",
  boxShadow: "0 0 8px rgba(255,165,0,0.8)",
  transition: "all 0.3s ease",
  animation: "pulseGlow 1.5s infinite",
  cursor: "pointer"
};