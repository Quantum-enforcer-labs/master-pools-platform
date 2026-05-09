import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const AdminProjects = lazy(() => import("../../pages/admin/AdminProjects"));

export const Route = createFileRoute("/admin/projects")({
  component: () => (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <AdminProjects />
    </Suspense>
  ),
});
