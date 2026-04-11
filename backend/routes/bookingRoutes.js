import express from "express";

import {
  getBookingById,
  getUserBookings,
} from "../controllers/bookingController.js";

import {
  createRazorpayOrder,
  verifyPaymentAndCreateBooking,
} from "../controllers/paymentController.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("BOOKING ROUTE HIT:", req.method, req.url);
  next();
});

router.get("/user/:userId", getUserBookings);
router.get("/:id", getBookingById);
router.post("/create-order", createRazorpayOrder);
router.post("/verify-payment", verifyPaymentAndCreateBooking);

export default router;