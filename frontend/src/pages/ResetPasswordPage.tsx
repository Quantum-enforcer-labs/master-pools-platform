import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useResetPassword } from "../hooks/useApi";

type ResetForm = { password: string; confirm: string };

export default function ResetPasswordPage() {
  const { mutate, isPending } = useResetPassword();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const id = params.get("id") || "";
  const token = params.get("token") || "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetForm>();

  const onSubmit = (data: ResetForm) => {
    mutate(
      { id, token, password: data.password },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Password updated");
          window.location.assign("/login");
        },
        onError: (err: any) =>
          toast.error(
            err.response?.data?.message || "Unable to reset password",
          ),
      },
    );
  };

  if (!id || !token) {
    return (
      <div style={{ padding: "6rem 1rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
          Invalid reset link
        </h1>
        <p
          style={{ color: "var(--color-text-secondary)", marginTop: "0.4rem" }}
        >
          This link is missing required parameters.
        </p>
      </div>
    );
  }

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
          Set a new password
        </h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            marginBottom: "1.3rem",
          }}
        >
          Choose a strong new password for your account.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "grid", gap: "0.9rem" }}
        >
          <div>
            <label className="label">New password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
              className="input"
              placeholder="New password"
            />
            {errors.password && (
              <p
                style={{
                  color: "var(--color-danger)",
                  fontSize: "0.75rem",
                  marginTop: "0.3rem",
                }}
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">Confirm password</label>
            <input
              type="password"
              {...register("confirm", {
                required: "Please confirm password",
                validate: (v) =>
                  v === watch("password") || "Passwords do not match",
              })}
              className="input"
              placeholder="Confirm password"
            />
            {errors.confirm && (
              <p
                style={{
                  color: "var(--color-danger)",
                  fontSize: "0.75rem",
                  marginTop: "0.3rem",
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
            <KeyRound style={{ width: "1rem", height: "1rem" }} />
            {isPending ? "Updating..." : "Update password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
