import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const AdminDashboard = lazy(() => import("../../pages/admin/AdminDashboard"));

export const Route = createFileRoute("/admin/")({
  component: () => (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <AdminDashboard />
    </Suspense>
  ),
});
