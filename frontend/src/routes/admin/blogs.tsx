import { Suspense, lazy } from "react";

import { createFileRoute } from "@tanstack/react-router";

const AdminBlogs = lazy(() => import("../../pages/admin/AdminBlogs"));

export const Route = createFileRoute("/admin/blogs")({
  component: () => (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <AdminBlogs />
    </Suspense>
  ),
});
