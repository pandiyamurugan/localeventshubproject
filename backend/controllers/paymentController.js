import razorpay from "../utils/razorpay.js";
import Booking from "../models/Booking.js";


export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, 
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    console.log("✅ ORDER CREATED:", order);

    res.status(200).json(order);

  } catch (err) {
    console.log("❌ Razorpay Order Error:", err);

    res.status(500).json({
      message: "Order creation failed",
      error: err.message,
    });
  }
};


export const verifyPaymentAndCreateBooking = async (req, res) => {
  try {
    const {
      userId,
      eventId,
      seats,
      totalAmount,
      paymentId,
      orderId,
    } = req.body;

   
    if (!paymentId || !orderId) {
      return res.status(400).json({ message: "Payment missing" });
    }

    
    if (!userId || !eventId || !seats || seats.length === 0) {
      return res.status(400).json({ message: "Missing booking data" });
    }

    
    const booking = await Booking.create({
      userId,
      eventId,
      seats,
      totalAmount,
      status: "paid",
    });

    console.log("✅ BOOKING CREATED:", booking);

    res.status(201).json(booking);

  } catch (err) {
    console.log("❌ Payment Verify Error:", err);

    res.status(500).json({
      message: "Payment verification failed",
      error: err.message,
    });
  }
};