import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ProtectedRoute } from "./pages/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";

// USER PAGES
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Bookmark from "./pages/Bookmark";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// ADMIN PAGE (NEW)
import AdminDashboard from "./pages/AdminDashboard";
import Booking from "./pages/Booking";
import Ticket from "./pages/Ticketpage";
import Homepage from "./pages/Homepage"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false,
  });

  AOS.refresh();
}, []);
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
      
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepages" element={<Homepage />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOtp />} />
<Route path="/reset-password" element={<ResetPassword />} />


        {/* USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute role="user">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute role="user">
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookmark"
          element={
            <ProtectedRoute role="user">
              <Bookmark />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute role="user">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute role="user">
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
  path="/book/:id"
  element={
    <ProtectedRoute role="user">
      <Booking />
    </ProtectedRoute>
  }
/>
   <Route
  path="/ticket/:id"
  element={
    <ProtectedRoute role="user">
      <Ticket />
    </ProtectedRoute>
  }
/>
      
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;