import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  renderOtp,
  renderPasswordChanged,
  renderPasswordReset,
  renderWelcome,
} from "../emails/templates.js";
import User from "../models/User.model.js";
import { sendFromPlatform } from "../utils/email.service.js";

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );

export const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const existing = await User.findOne({ email });
  if (existing)
    return res.status(409).json({ message: "Email already registered" });
  const user = await User.create({
    name,
    email,
    password,
    phone,
    isVerified: false,
  });
  const token = signToken(user);

  // Generate and send OTP for email verification
  try {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    user.otp = code;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    await sendFromPlatform({
      to: user.email,
      subject: "Verify your MATERPOOLS AND CONTRUCTION account",
      html: renderOtp(user.name, code),
    });
  } catch (err) {
    console.error("Send OTP failed:", err);
  }

  // Also send a friendly welcome message
  try {
    await sendFromPlatform({
      to: user.email,
      subject: "Welcome to MATERPOOLS AND CONTRUCTION",
      html: renderWelcome(user.name),
    });
  } catch (err) {
    console.error("Welcome email failed:", err);
  }

  res.status(201).json({ token, user });
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  const code = String(Math.floor(100000 + Math.random() * 900000));
  user.otp = code;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  try {
    await sendFromPlatform({
      to: user.email,
      subject: "Your verification code",
      html: renderOtp(user.name, code),
    });
  } catch (err) {
    console.error("sendOtp error:", err);
    return res.status(500).json({ message: "Unable to send OTP" });
  }
  res.json({ message: "OTP sent" });
};

export const verifyOtp = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code)
    return res.status(400).json({ message: "Email and code required" });
  if (!/^\d{6}$/.test(String(code))) {
    return res.status(400).json({ message: "Code must be a 6-digit number" });
  }
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (
    !user.otp ||
    user.otp !== String(code) ||
    !user.otpExpires ||
    user.otpExpires < new Date()
  ) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
  res.json({ message: "Account verified" });
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });
  const user = await User.findOne({ email });
  // Prevent account enumeration by returning a generic success message.
  if (!user)
    return res.json({
      message: "If that email exists, a password reset email has been sent",
    });
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  user.resetToken = tokenHash;
  user.resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes
  await user.save();
  const link = `${process.env.CLIENT_URL}/reset-password?token=${token}&id=${user._id}`;
  try {
    await sendFromPlatform({
      to: user.email,
      subject: "Reset your MATERPOOLS AND CONTRUCTION password",
      html: renderPasswordReset(user.name, link),
    });
  } catch (err) {
    console.error("requestPasswordReset error:", err);
    return res.status(500).json({ message: "Unable to send reset email" });
  }
  res.json({
    message: "If that email exists, a password reset email has been sent",
  });
};

export const resetPassword = async (req, res) => {
  const { id, token, password } = req.body;
  if (!id || !token || !password)
    return res.status(400).json({ message: "id, token and password required" });
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({ _id: id, resetToken: tokenHash });
  if (!user || !user.resetExpires || user.resetExpires < new Date())
    return res.status(400).json({ message: "Invalid or expired token" });
  user.password = password;
  user.resetToken = undefined;
  user.resetExpires = undefined;
  await user.save();
  try {
    await sendFromPlatform({
      to: user.email,
      subject: "Your password was changed",
      html: renderPasswordChanged(user.name),
    });
  } catch (err) {
    console.error("resetPassword notification failed:", err);
  }
  res.json({ message: "Password updated" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  if (!user.isVerified) {
    return res.status(403).json({
      message: "Please verify your email before logging in",
      needsVerification: true,
    });
  }
  if (!user.isActive)
    return res.status(403).json({ message: "Account deactivated" });
  user.lastSeen = new Date();
  await user.save({ validateBeforeSave: false });
  const token = signToken(user);
  res.json({ token, user });
};

export const getMe = async (req, res) => {
  res.json({ user: req.user });
};

export const updateProfile = async (req, res) => {
  const { name, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, phone },
    { new: true, runValidators: true },
  );
  res.json({ user });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  if (!(await user.comparePassword(currentPassword))) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }
  user.password = newPassword;
  await user.save();
  res.json({ message: "Password updated successfully" });
};
