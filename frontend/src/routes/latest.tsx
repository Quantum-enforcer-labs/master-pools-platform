import LatestPage from "../pages/LatestPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/latest")({
  component: LatestPage,
});