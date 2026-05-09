import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const ProjectDetailPage = lazy(() => import("../pages/ProjectDetailPage"));

export const Route = createFileRoute("/projects/$id")({
  component: ProjectDetailRoute,
});

function ProjectDetailRoute() {
  const { id } = Route.useParams();

  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <ProjectDetailPage projectId={id} />
    </Suspense>
  );
}
