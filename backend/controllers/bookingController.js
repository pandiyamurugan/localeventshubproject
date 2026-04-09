import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    console.log("📩 BODY RECEIVED:", req.body);

    const { userId, eventId, seats, totalAmount } = req.body;

    if (!userId || !eventId || !seats || seats.length === 0) {
      return res.status(400).json({ message: "Missing booking data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const booking = await Booking.create({
      userId,
      eventId,
      seats,
      totalAmount,
      status: "paid",
    });

    console.log("✅ BOOKING SAVED:", booking);

    res.status(201).json(booking);
  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    console.log(" GET BOOKING ID:", req.params.id);

    const booking = await Booking.findById(req.params.id)
      .populate("eventId")
      .populate("userId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId })
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};