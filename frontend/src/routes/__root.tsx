import { Outlet, createRootRoute } from "@tanstack/react-router";
import SkipLink from "../components/a11y/SkipLink";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import ChatWidget from "../components/ui/ChatWidget";
import { useAuthStore } from "../stores/auth.store";
// theme removed from UI store

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const { isAuthenticated, user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-bg)",
        width: "100%",
        overflowX: "clip",
      }}
    >
      <SkipLink />
      <Navbar />
      <main id="main-content" style={{ flex: 1, paddingTop: "64px" }}>
        <Outlet />
      </main>
      <Footer />
      {isAuthenticated && !isAdmin && <ChatWidget />}
    </div>
  );
}
