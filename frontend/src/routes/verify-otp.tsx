import { createFileRoute } from "@tanstack/react-router";
import VerifyOtpPage from "../pages/VerifyOtpPage";

export const Route = createFileRoute("/verify-otp")({
  component: VerifyOtpPage,
});
