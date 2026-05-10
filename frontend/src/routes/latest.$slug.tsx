import { Suspense, lazy } from "react";

import { createFileRoute } from "@tanstack/react-router";

const LatestDetailPage = lazy(() => import("../pages/LatestDetailPage"));

export const Route = createFileRoute("/latest/$slug")({
  component: LatestDetailRoute,
});

function LatestDetailRoute() {
  const { slug } = Route.useParams();

  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <LatestDetailPage slug={slug} />
    </Suspense>
  );
}
