import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    lowercase: true,
  },
  otp: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 7 },
});

const OTP = mongoose.model("otps", otpSchema);

export default OTP;
