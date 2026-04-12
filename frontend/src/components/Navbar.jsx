import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaSignInAlt,
  FaUserPlus,
  FaUsers,
  FaSignOutAlt,
  FaUser,
  FaArrowLeft,
  FaBell,
} from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../App.css";
import BASE_URL from "../api";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // ⭐ FIX ADDED

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const [upcoming, setUpcoming] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  useEffect(() => {
    if (!token) return;

    const fetchEvents = () => {
      fetch(`${BASE_URL}/api/events`)
        .then((res) => res.json())
        .then((data) => {
          const now = new Date();

          const upcomingEvents = data.filter((ev) => {
            if (!ev.startTime) return false;

            const [h, m] = ev.startTime.split(":");
            const eventTime = new Date();
            eventTime.setHours(h, m, 0, 0);

            return eventTime.getTime() > now.getTime();
          });

          const uniqueUpcoming = Array.from(
            new Map(upcomingEvents.map((item) => [item._id, item])).values()
          );

          const sortedByCreated = uniqueUpcoming.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );

          setUpcoming(sortedByCreated.slice(-2));
        });
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 10000);
    return () => clearInterval(interval);
  }, [token]);

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
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="ms-auto d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">

             
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
                  <div className="d-flex align-items-center text-white fw-bold gap-3">

                    <span className="d-flex align-items-center">
                      <FaUser className="me-2" />
                      {userName || "User"}
                    </span>

                    <div className="bell-wrapper">
                      <FaBell style={{ cursor: "pointer" }} />

                      {upcoming.length > 0 && (
                        <span className="bell-badge">
                          {upcoming.length}
                        </span>
                      )}

                      <div className="bell-dropdown">
                        {upcoming.length === 0 ? (
                          <p className="m-2 text-muted">No upcoming events</p>
                        ) : (
                          upcoming.map((ev) => (
                            <div key={ev._id} className="bell-item">
                              <strong>{ev.title}</strong>
                              <small className="d-block text-white">
                                {ev.startTime} - {ev.endTime}
                              </small>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>

                  <button onClick={handleLogout} className="btn btn-danger">
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </button>

                  <Link
                    to="/dashboard"
                    className="btn btn-secondary d-flex align-items-center"
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