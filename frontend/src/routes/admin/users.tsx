import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const AdminUsers = lazy(() => import("../../pages/admin/AdminUsers"));

export const Route = createFileRoute("/admin/users")({
  component: () => (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <AdminUsers />
    </Suspense>
  ),
});
