import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import BASE_URL from "../api";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

 

  


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Registered Successfully");
          setTimeout(() => navigate("/"), 1500);
        } else {
          toast.error(data.msg || "Registration failed");
        }
      } catch (error) {
        toast.error("Server error");
      }
    },
  });

  return (
    <div className="register-bg d-flex align-items-center justify-content-center">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="register-card row overflow-hidden">

        <div className="col-md-12 p-5 d-flex flex-column justify-content-center text-white">

          <h2 className="fw-bold mb-2">
            Register Your <span style={{ color: "orange" }}> Account</span>
          </h2>
          <p className="mb-4 text-light">Join us and explore amazing features</p>

          <form onSubmit={formik.handleSubmit}>

           
            <div style={{ position: "relative" }}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control custom-input mb-3 p-3 white-input"
                 style={{
                  borderRadius: "10px",
                  border:"none",
                  borderBottom: "2px solid orange",
                  background: "#ffa5000f",
                  color: "white",
                  paddingRight: "40px"
                }}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <FaUser size={30} style={iconStyle} />

            
            </div>
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger small mb-1">{formik.errors.name}</div>
              )}

          
            <div style={{ position: "relative" }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control custom-input mb-3 p-3 white-input"
                style={inputStyle}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <MdEmail size={30} style={iconStyle} />

             
            </div>
             {formik.touched.email && formik.errors.email && (
                <div className="text-danger small mb-1">{formik.errors.email}</div>
              )}

           
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-control custom-input mb-3 p-3 white-input"
                style={inputStyle}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <div onClick={() => setShowPassword(!showPassword)} >
                {showPassword ? <FaEyeSlash style={eyeStyle} size={30} /> : <FaEye style={eyeStyle} size={30} />}
              </div>

             
            </div>
             {formik.touched.password && formik.errors.password && (
                <div className="text-danger small mb-1">{formik.errors.password}</div>
              )}

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
              Register
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
            Already have an account?
            <span
              onClick={() => navigate("/")}
              className="ms-2 fw-bold text-warning"
              style={{ cursor: "pointer" }}
            >
              Login
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