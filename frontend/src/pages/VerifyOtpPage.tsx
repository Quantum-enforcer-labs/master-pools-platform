import { useSendOtp, useVerifyOtp } from "../hooks/useApi";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type VerifyForm = { email: string; code: string };

export default function VerifyOtpPage() {
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: sendOtp, isPending: isSending } = useSendOtp();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const emailFromQuery = params.get("email") || "";

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<VerifyForm>({
    defaultValues: { email: emailFromQuery, code: "" },
  });

  const onSubmit = (data: VerifyForm) => {
    verifyOtp(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Account verified. You can now login.");
        window.location.assign("/login");
      },
      onError: (err: any) =>
        toast.error(err.response?.data?.message || "Unable to verify account"),
    });
  };

  const resend = () => {
    const email = getValues("email");
    if (!email) {
      toast.error("Enter your email first");
      return;
    }
    sendOtp(
      { email },
      {
        onSuccess: (res) => toast.success(res.message || "OTP sent"),
        onError: (err: any) =>
          toast.error(err.response?.data?.message || "Unable to send OTP"),
      },
    );
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: "100%",
          maxWidth: "28rem",
          background: "#fff",
          border: "1px solid var(--color-border)",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.07)",
        }}
      >
        <h1
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            marginBottom: "0.4rem",
          }}
        >
          Verify your email
        </h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            marginBottom: "1.3rem",
          }}
        >
          Enter the 6-digit code sent to your inbox.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "grid", gap: "0.9rem" }}
        >
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className="input"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p
                style={{
                  color: "var(--color-danger)",
                  fontSize: "0.75rem",
                  marginTop: "0.3rem",
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">OTP code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              {...register("code", {
                required: "Code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Enter a valid 6-digit code",
                },
              })}
              className="input"
              placeholder="123456"
            />
            {errors.code && (
              <p
                style={{
                  color: "var(--color-danger)",
                  fontSize: "0.75rem",
                  marginTop: "0.3rem",
                }}
              >
                {errors.code.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              border: "none",
              borderRadius: "10px",
              background: "var(--color-primary-900)",
              color: "#fff",
              fontWeight: 700,
              padding: "0.8rem 1rem",
              cursor: "pointer",
              opacity: isVerifying ? 0.75 : 1,
            }}
          >
            <ShieldCheck style={{ width: "1rem", height: "1rem" }} />
            {isVerifying ? "Verifying..." : "Verify account"}
          </button>
        </form>

        <button
          type="button"
          onClick={resend}
          disabled={isSending}
          style={{
            marginTop: "0.75rem",
            background: "transparent",
            border: "1px solid var(--color-border)",
            color: "var(--color-primary-900)",
            borderRadius: "10px",
            width: "100%",
            fontWeight: 600,
            padding: "0.7rem 0.9rem",
            cursor: "pointer",
            opacity: isSending ? 0.75 : 1,
          }}
        >
          {isSending ? "Resending..." : "Resend OTP"}
        </button>
      </motion.div>
    </div>
  );
}
