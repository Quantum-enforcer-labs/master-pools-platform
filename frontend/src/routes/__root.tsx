import { Outlet, createRootRoute } from "@tanstack/react-router";

import { useEffect } from "react";
import SkipLink from "../components/a11y/SkipLink";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import ChatWidget from "../components/ui/ChatWidget";
import { useAuthStore } from "../stores/auth.store";
import { useUIStore } from "../stores/ui.store";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const { isAuthenticated, user } = useAuthStore();
  const { theme } = useUIStore();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    // Apply theme to document on mount and when theme changes
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  }, [theme]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-bg)",
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
