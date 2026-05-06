import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  GraduationCap,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRegister } from "../hooks/useApi";
import type { RegisterForm } from "../types";

const PERKS = [
  "Submit quotation requests",
  "Real-time chat with our team",
  "Track project progress",
  "Receive detailed quotes",
];

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const { mutate, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = ({ confirm, ...data }: RegisterForm) => {
    mutate(data, {
      onSuccess: ({ user }) => {
        toast.success(
          "Account created. Please verify your email with the OTP sent to you.",
        );
        window.location.assign(
          `/verify-otp?email=${encodeURIComponent(user.email)}`,
        );
      },
      onError: (e: any) =>
        toast.error(e.response?.data?.message || "Registration failed"),
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1.5rem 3rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ width: "100%", maxWidth: "30rem" }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              textDecoration: "none",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                background: "var(--color-primary-900)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GraduationCap
                style={{ width: "1.25rem", height: "1.25rem", color: "#fff" }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: "1.375rem",
                color: "var(--color-primary-900)",
                letterSpacing: "-0.02em",
              }}
            >
              Master
              <span style={{ color: "var(--color-secondary-500)" }}>Pools</span>
            </span>
          </Link>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "1.75rem",
              color: "var(--color-text)",
              letterSpacing: "-0.025em",
              marginBottom: "0.375rem",
            }}
          >
            Create your account
          </h1>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "0.9375rem",
            }}
          >
            Join the MATERPOOLS AND CONTRUCTION client platform
          </p>
        </div>

        {/* Perks grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {PERKS.map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                padding: "0.625rem",
                background: "var(--color-primary-50)",
                border: "1px solid var(--color-primary-100)",
                borderRadius: "8px",
              }}
            >
              <CheckCircle
                style={{
                  width: "0.875rem",
                  height: "0.875rem",
                  color: "var(--color-accent-500)",
                  flexShrink: 0,
                  marginTop: "0.1rem",
                }}
              />
              <span
                style={{
                  color: "var(--color-gray-600)",
                  fontSize: "0.75rem",
                  lineHeight: 1.4,
                }}
              >
                {p}
              </span>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--color-border)",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <label className="label">
                Full Name{" "}
                <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <input
                {...register("name", {
                  required: "Name required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
                className="input"
                placeholder="John Smith"
                autoComplete="name"
                style={
                  errors.name ? { borderColor: "var(--color-danger)" } : {}
                }
              />
              {errors.name && (
                <p
                  style={{
                    color: "var(--color-danger)",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                Email Address{" "}
                <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                className="input"
                placeholder="you@example.com"
                autoComplete="email"
                style={
                  errors.email ? { borderColor: "var(--color-danger)" } : {}
                }
              />
              {errors.email && (
                <p
                  style={{
                    color: "var(--color-danger)",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                Phone{" "}
                <span
                  style={{ color: "var(--color-gray-400)", fontWeight: 400 }}
                >
                  (optional)
                </span>
              </label>
              <input
                {...register("phone")}
                className="input"
                placeholder="+263 77 000 0000"
                autoComplete="tel"
              />
            </div>

            <div>
              <label className="label">
                Password <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: "Password required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                  className="input"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  style={{
                    paddingRight: "2.75rem",
                    ...(errors.password
                      ? { borderColor: "var(--color-danger)" }
                      : {}),
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-gray-400)",
                    padding: 0,
                    display: "flex",
                  }}
                >
                  {showPass ? (
                    <EyeOff style={{ width: "1rem", height: "1rem" }} />
                  ) : (
                    <Eye style={{ width: "1rem", height: "1rem" }} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  style={{
                    color: "var(--color-danger)",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                Confirm Password{" "}
                <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <input
                type="password"
                {...register("confirm", {
                  required: "Please confirm your password",
                  validate: (v) =>
                    v === watch("password") || "Passwords do not match",
                })}
                className="input"
                placeholder="Repeat your password"
                autoComplete="new-password"
                style={
                  errors.confirm ? { borderColor: "var(--color-danger)" } : {}
                }
              />
              {errors.confirm && (
                <p
                  style={{
                    color: "var(--color-danger)",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {errors.confirm.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.8125rem",
                fontSize: "0.9375rem",
                fontWeight: 700,
                background: "var(--color-primary-900)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                boxShadow: "0 4px 14px rgba(30,58,138,0.25)",
                marginTop: "0.5rem",
                opacity: isPending ? 0.7 : 1,
              }}
            >
              {isPending ? (
                <>
                  <span
                    style={{
                      width: "1rem",
                      height: "1rem",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid #fff",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                      display: "inline-block",
                    }}
                  />
                  Creating account…
                </>
              ) : (
                <>
                  <UserPlus style={{ width: "1rem", height: "1rem" }} /> Create
                  Account
                </>
              )}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              color: "var(--color-text-secondary)",
              fontSize: "0.875rem",
              marginTop: "1.5rem",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--color-primary-900)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign in{" "}
              <ArrowRight
                style={{
                  width: "0.75rem",
                  height: "0.75rem",
                  display: "inline",
                  verticalAlign: "middle",
                }}
              />
            </Link>
          </p>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "var(--color-gray-400)",
            fontSize: "0.75rem",
            marginTop: "1.25rem",
          }}
        >
          By registering you agree to our{" "}
          <a
            href="#"
            style={{ color: "var(--color-gray-500)", textDecoration: "none" }}
          >
            Terms
          </a>{" "}
          &{" "}
          <a
            href="#"
            style={{ color: "var(--color-gray-500)", textDecoration: "none" }}
          >
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  );
}
