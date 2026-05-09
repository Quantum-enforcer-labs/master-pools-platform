import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));

export const Route = createFileRoute("/forgot-password")({
  component: () => (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <ForgotPasswordPage />
    </Suspense>
  ),
});
