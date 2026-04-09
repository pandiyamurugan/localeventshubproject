import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ msg: "All fields required" });

  const hashed = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashed });

  res.json({ msg: "Registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    let admin = await User.findOne({ email: "admin@gmail.com" });

    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      admin = await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin created automatically");
    }

   
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

   
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

   
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

   
    user.token = token;
    await user.save();

  
    res.json({
      token,
      role: user.role,
      userId: user._id,
       name: user.email
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000; 
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

 try {
  const info = await transporter.sendMail({
    from: `"Auth App" <${process.env.USER_EMAIL}>`,
    to: email,
    subject: "OTP for Password Reset",
    text: `Your OTP is ${otp}`,
  });

  console.log("Email sent:", info.response);
} catch (err) {
  console.error("Email error:", err);
  return res.status(500).json({ msg: "Failed to send email" });
}

  res.json({ msg: "OTP sent to email" });
};
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp)
    return res.status(400).json({ msg: "Invalid OTP" });

  if (user.otpExpiry < Date.now())
    return res.status(400).json({ msg: "OTP expired" });

  res.json({ msg: "OTP verified" });
};
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const hashed = await bcrypt.hash(password, 10);

  user.password = hashed;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  res.json({ msg: "Password reset successful" });
};
export const getAllUsers = async (req,res) => {
  try{
    const users = await User.find().select("-password");
    res.json(users);
  }
  catch(err){
    res.status(500).json({msg:"Server Eroor"})
  }
}