import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  otp: String,
otpExpiry: Date,
token: { type: String},
 role: { type: String, default: "user" },
});

export default mongoose.model("User", userSchema);