import express from "express";
import {
  createBooking,
  getBookingById,
  getUserBookings,
} from "../controllers/bookingController.js";

const router = express.Router();


router.use((req, res, next) => {
  console.log("BOOKING ROUTE HIT:", req.method, req.url);
  next();
});

// CREATE BOOKING
router.post("/", createBooking);

// GET USER BOOKINGS
router.get("/user/:userId", getUserBookings);

// GET SINGLE BOOKING (TICKET)
router.get("/:id", getBookingById);

export default router;