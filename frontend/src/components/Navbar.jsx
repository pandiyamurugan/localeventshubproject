import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserPlus,
  FaUsers,
  FaSignOutAlt,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../App.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="bg-dark navbar-main">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark px-3 py-3 shadow">

          <Link
            to="/homepages"
            className="navbar-brand fw-bold d-flex align-items-center"
            style={{ color: "orange" }}
          >
            <FaUsers className="me-2" />
            Local Events Hub
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="ms-auto d-flex flex-column flex-lg-row align-items-center gap-2 mt-3 mt-lg-0">

              {!token && (
                <>
                  <Link
                    to="/"
                    className={`nav-btn login-btn ${
                      location.pathname === "/"
                        ? "active-orange"
                        : "unactive-mode"
                    }`}
                    style={{ color: "white" }}
                  >
                    <FaSignInAlt className="me-2" />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className={`nav-btn register-btn ${
                      location.pathname === "/register"
                        ? "active-orange"
                        : "unactive-mode"
                    }`}
                    style={{ color: "white" }}
                  >
                    <FaUserPlus className="me-2" />
                    Register
                  </Link>
                </>
              )}

              {token && (
                <>
                  <span
                    className="d-flex align-items-center text-white fw-bold"
                  >
                    <FaUser className="me-2" />
                    {userName || "User"}
                  </span>

                  

                  <button
                    onClick={handleLogout}
                    className="btn btn-danger"
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </button>
                  <Link
                    to="/dashboard"
                    className="btn btn-secondary dashboard-arr d-flex align-items-center"
                  >
                    <FaArrowLeft />
                  </Link>
                </>
              )}

            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}