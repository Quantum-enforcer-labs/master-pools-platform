import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRequestPasswordReset } from "../hooks/useApi";

type ForgotForm = { email: string };

export default function ForgotPasswordPage() {
  const { mutate, isPending } = useRequestPasswordReset();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>();

  const onSubmit = (data: ForgotForm) => {
    mutate(data, {
      onSuccess: (res) =>
        toast.success(
          res.message || "If that email exists, a reset link was sent",
        ),
      onError: (err: any) =>
        toast.error(
          err.response?.data?.message || "Unable to send reset email",
        ),
    });
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
          Forgot your password?
        </h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            marginBottom: "1.3rem",
          }}
        >
          Enter your email and we will send a secure reset link.
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

          <button
            type="submit"
            disabled={isPending}
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
              opacity: isPending ? 0.75 : 1,
            }}
          >
            <Mail style={{ width: "1rem", height: "1rem" }} />
            {isPending ? "Sending..." : "Send reset link"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
