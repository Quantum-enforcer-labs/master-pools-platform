import { createFileRoute } from "@tanstack/react-router";
import AdminVideos from "../../pages/admin/AdminVideos";

export const Route = createFileRoute("/admin/videos")({
  component: AdminVideos,
});
