import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useConversations } from "../../hooks/useApi";
import { useAuthStore } from "../../stores/auth.store";
import { useUIStore } from "../../stores/ui.store";
import NotificationCenter from "../shared/NotificationCenter";

const NAV = [
  { to: "/" as const, label: "Home" },
  { to: "/projects" as const, label: "Projects" },
  { to: "/about" as const, label: "About" },
  { to: "/contact" as const, label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const { isAuthenticated, user, logout } = useAuthStore();
  const { mobileMenuOpen, setMobileMenuOpen, setChatOpen } = useUIStore();
  const navigate = useNavigate();
  const { data: convData } = useConversations(
    isAuthenticated && user?.role !== "admin",
  );
  const routerState = useRouterState();
  const path = routerState.location.pathname;

  const totalUnread =
    isAuthenticated && user?.role !== "admin"
      ? ((convData as any[]) || []).reduce(
          (s: number, c: any) => s + (c.unreadByUser || 0),
          0,
        )
      : 0;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenu(false);
  }, [path]);
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchOpen]);

  const isActive = (to: string) =>
    to === "/" ? path === "/" : path.startsWith(to);

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    setMobileMenuOpen(false);
    navigate({ to: "/" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.25s ease",
        background: scrolled
          ? "rgba(255,255,255,0.97)"
          : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
        boxShadow: scrolled
          ? "0 1px 0 rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)"
          : "none",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          width: "100%",
          padding: "0 clamp(0.875rem, 4vw, 1.5rem)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexShrink: 0,
            marginRight: "1rem",
          }}
        >
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/logo.jpeg"
              alt="MATERPOOLS AND CONTRUCTION logo"
              width={48}
              height={48}
              loading="eager"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          style={{
            alignItems: "center",
            gap: "0.125rem",
            flex: 1,
          }}
          className="hidden lg:flex"
        >
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                padding: "0.4375rem 0.875rem",
                fontSize: "0.875rem",
                borderRadius: "8px",
                transition: "all 0.15s ease",
                textDecoration: "none",
                color: isActive(to)
                  ? "var(--color-primary-900)"
                  : "var(--color-gray-600)",
                background: isActive(to)
                  ? "var(--color-primary-50)"
                  : "transparent",
                fontWeight: isActive(to) ? 600 : 500,
              }}
              onMouseEnter={(e) => {
                if (!isActive(to)) {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--color-primary-900)";
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--color-gray-100)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(to)) {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--color-gray-600)";
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }
              }}
            >
              {label}
              {isActive(to) && (
                <span
                  style={{
                    display: "block",
                    position: "absolute",
                    bottom: "-2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "1.25rem",
                    height: "2px",
                    background: "var(--color-primary-900)",
                    borderRadius: "999px",
                  }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div
          style={{
            alignItems: "center",
            gap: "0.375rem",
            marginLeft: "auto",
          }}
          className="hidden lg:flex"
        >
          {/* Search */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                style={{ overflow: "hidden" }}
              >
                <input
                  ref={searchRef}
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  onBlur={() => setSearchOpen(false)}
                  placeholder="Search projects…"
                  style={{
                    padding: "0.4375rem 0.875rem",
                    fontSize: "0.8125rem",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    outline: "none",
                    width: "100%",
                    background: "var(--color-gray-50)",
                    color: "var(--color-text)",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQ) {
                      window.location.href = `/projects?search=${encodeURIComponent(searchQ)}`;
                      setSearchOpen(false);
                    }
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              padding: "0.4375rem",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "var(--color-gray-500)",
              transition: "all 0.15s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-gray-100)";
              e.currentTarget.style.color = "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-gray-500)";
            }}
          >
            <Search style={{ width: "1rem", height: "1rem" }} />
          </button>

          {/* Theme toggle removed */}

          {isAuthenticated ? (
            <>
              <NotificationCenter />
              {user?.role !== "admin" && (
                <button
                  onClick={() => setChatOpen(true)}
                  style={{
                    position: "relative",
                    padding: "0.4375rem",
                    borderRadius: "8px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-gray-500)",
                    transition: "all 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--color-gray-100)";
                    e.currentTarget.style.color = "var(--color-text)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--color-gray-500)";
                  }}
                >
                  <MessageCircle style={{ width: "1rem", height: "1rem" }} />
                  {totalUnread > 0 && (
                    <span className="notif-dot">{totalUnread}</span>
                  )}
                </button>
              )}

              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.375rem 0.625rem 0.375rem 0.5rem",
                    borderRadius: "10px",
                    background: "var(--color-gray-100)",
                    border: "1px solid var(--color-border)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--color-gray-200)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--color-gray-100)")
                  }
                >
                  <div
                    style={{
                      width: "1.625rem",
                      height: "1.625rem",
                      borderRadius: "6px",
                      background: "var(--color-primary-900)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.6875rem",
                    }}
                  >
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-gray-700)",
                      fontWeight: 600,
                      maxWidth: "5rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown
                    style={{
                      width: "0.875rem",
                      height: "0.875rem",
                      color: "var(--color-gray-400)",
                      transition: "transform 0.2s",
                      transform: userMenu ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>

                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.13 }}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "3.25rem",
                        width: "15rem",
                        zIndex: 60,
                        padding: "0.375rem",
                        background: "#fff",
                        border: "1px solid var(--color-border)",
                        borderRadius: "14px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div
                        style={{ padding: "0.75rem", marginBottom: "0.25rem" }}
                      >
                        <p
                          style={{
                            fontSize: "0.6875rem",
                            color: "var(--color-gray-400)",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Signed in as
                        </p>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "var(--color-text)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {user?.email}
                        </p>
                        {user?.role === "admin" && (
                          <span
                            className="badge badge-blue"
                            style={{
                              marginTop: "0.375rem",
                              display: "inline-flex",
                              gap: "0.25rem",
                            }}
                          >
                            <Shield
                              style={{ width: "0.625rem", height: "0.625rem" }}
                            />{" "}
                            Admin
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          height: "1px",
                          background: "var(--color-border)",
                          margin: "0 0 0.375rem",
                        }}
                      />
                      {[
                        user?.role === "admin"
                          ? {
                              to: "/admin",
                              icon: LayoutDashboard,
                              label: "Admin Panel",
                            }
                          : {
                              to: "/dashboard",
                              icon: LayoutDashboard,
                              label: "Dashboard",
                            },
                        ...(user?.role !== "admin"
                          ? [
                              {
                                to: "/quotation",
                                icon: FileText,
                                label: "New Quotation",
                              },
                            ]
                          : []),
                      ].map(({ to, icon: Icon, label }) => (
                        <Link
                          key={to}
                          to={to as any}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.625rem",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "8px",
                            fontSize: "0.875rem",
                            color: "var(--color-gray-600)",
                            textDecoration: "none",
                            transition: "all 0.12s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "var(--color-gray-100)";
                            e.currentTarget.style.color = "var(--color-text)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color =
                              "var(--color-gray-600)";
                          }}
                        >
                          <Icon style={{ width: "1rem", height: "1rem" }} />{" "}
                          {label}
                        </Link>
                      ))}
                      <div
                        style={{
                          height: "1px",
                          background: "var(--color-border)",
                          margin: "0.375rem 0",
                        }}
                      />
                      <button
                        onClick={handleLogout}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.625rem",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          color: "#DC2626",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.12s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(239,68,68,0.06)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <LogOut style={{ width: "1rem", height: "1rem" }} />{" "}
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: "0.4375rem 0.875rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--color-gray-600)",
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-primary-900)";
                  e.currentTarget.style.background = "var(--color-gray-100)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-gray-600)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.4375rem 0.875rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  background: "var(--color-primary-900)",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "all 0.15s ease",
                  boxShadow: "0 1px 2px rgba(30,58,138,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-primary-800)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-primary-900)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Sparkles style={{ width: "0.875rem", height: "0.875rem" }} />{" "}
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile theme toggle removed */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden"
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          style={{
            marginLeft: "auto",
            padding: "0.5rem",
            borderRadius: "8px",
            background: "var(--color-gray-100)",
            border: "1px solid var(--color-border)",
            cursor: "pointer",
            color: "var(--color-gray-600)",
          }}
        >
          <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }}>
            {mobileMenuOpen ? (
              <X style={{ width: "1.125rem", height: "1.125rem" }} />
            ) : (
              <Menu style={{ width: "1.125rem", height: "1.125rem" }} />
            )}
          </motion.div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "#fff",
              borderTop: "1px solid var(--color-border)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "0.75rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              {NAV.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    display: "block",
                    padding: "0.625rem 0.875rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: isActive(to) ? 600 : 500,
                    textDecoration: "none",
                    color: isActive(to)
                      ? "var(--color-primary-900)"
                      : "var(--color-gray-600)",
                    background: isActive(to)
                      ? "var(--color-primary-50)"
                      : "transparent",
                  }}
                >
                  {label}
                </Link>
              ))}
              <div
                style={{
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--color-border)",
                  marginTop: "0.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      to={user?.role === "admin" ? "/admin" : "/dashboard"}
                      className="btn btn-secondary btn-md"
                      style={{ justifyContent: "center" }}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        padding: "0.625rem",
                        fontSize: "0.875rem",
                        color: "#DC2626",
                        border: "1px solid rgba(239,68,68,0.2)",
                        borderRadius: "8px",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="btn btn-secondary btn-md"
                      style={{ justifyContent: "center" }}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary btn-md"
                      style={{ justifyContent: "center" }}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
