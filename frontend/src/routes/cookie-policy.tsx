import { createFileRoute } from "@tanstack/react-router";
import CookiePolicyPage from "../pages/CookiePolicyPage";

export const Route = createFileRoute("/cookie-policy")({
  component: CookiePolicyPage,
});
