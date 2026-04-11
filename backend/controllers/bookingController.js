import Booking from "../models/Booking.js";


export const getBookingById = async (req, res) => {
  try {
    console.log("📥 GET BOOKING ID:", req.params.id);

    const booking = await Booking.findById(req.params.id)
      .populate("eventId")
      .populate("userId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);

  } catch (err) {
    console.log("❌ Get Booking Error:", err);

    res.status(500).json({
      message: "Failed to fetch booking",
      error: err.message,
    });
  }
};



export const getUserBookings = async (req, res) => {
  try {
    console.log("📥 GET USER BOOKINGS:", req.params.userId);

    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);

  } catch (err) {
    console.log("❌ Get User Bookings Error:", err);

    res.status(500).json({
      message: "Failed to fetch user bookings",
      error: err.message,
    });
  }
};