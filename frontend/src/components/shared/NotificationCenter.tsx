import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Check,
  CheckCheck,
  DollarSign,
  ExternalLink,
  FileText,
  MessageCircle,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import api from "../../api/client";

interface Notification {
  _id: string;
  type: string;
  title: string;
  body?: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      api
        .get<{
          notifications: Notification[];
          unreadCount: number;
        }>("/notifications")
        .then((r) => r.data),
    refetchInterval: 15_000,
  });

  const markAll = useMutation({
    mutationFn: () => api.patch("/notifications/read-all"),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
  const markOne = useMutation({
    mutationFn: (id: string) => api.patch(`/notifications/${id}/read`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/notifications/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;
  const typeIcon = (t: string) =>
    ({
      quotation_update: DollarSign,
      message: MessageCircle,
      system: Bell,
      review: Star,
    })[t] || FileText;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
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
        <Bell style={{ width: "1rem", height: "1rem" }} />
        {unreadCount > 0 && (
          <span className="notif-dot">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              style={{ position: "fixed", inset: 0, zIndex: 40 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.13 }}
              style={{
                position: "absolute",
                right: 0,
                top: "3rem",
                zIndex: 50,
                width: "21rem",
                background: "#fff",
                border: "1px solid var(--color-border)",
                borderRadius: "14px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.875rem 1rem",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      margin: 0,
                    }}
                  >
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-tertiary)",
                        margin: 0,
                      }}
                    >
                      {unreadCount} unread
                    </p>
                  )}
                </div>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => markAll.mutate()}
                      title="Mark all read"
                      style={{
                        padding: "0.375rem",
                        borderRadius: "6px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--color-gray-400)",
                        transition: "all 0.12s ease",
                        display: "flex",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "var(--color-gray-100)";
                        e.currentTarget.style.color = "var(--color-text)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--color-gray-400)";
                      }}
                    >
                      <CheckCheck
                        style={{ width: "0.875rem", height: "0.875rem" }}
                      />
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      padding: "0.375rem",
                      borderRadius: "6px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--color-gray-400)",
                      display: "flex",
                    }}
                  >
                    <X style={{ width: "0.875rem", height: "0.875rem" }} />
                  </button>
                </div>
              </div>

              <div style={{ maxHeight: "21rem", overflowY: "auto" }}>
                {!notifications.length ? (
                  <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                    <Bell
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        color: "var(--color-gray-300)",
                        margin: "0 auto 0.5rem",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "0.75rem 1rem",
                        borderBottom: "1px solid var(--color-border)",
                        background: !n.isRead
                          ? "var(--color-primary-50)"
                          : "transparent",
                        transition: "background 0.12s",
                      }}
                      className="group"
                      onMouseEnter={(e) => {
                        if (n.isRead)
                          e.currentTarget.style.background =
                            "var(--color-gray-50)";
                      }}
                      onMouseLeave={(e) => {
                        if (n.isRead)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.125rem",
                          flexShrink: 0,
                          marginTop: "0.0625rem",
                        }}
                      >
                        {(() => {
                          const Icon = typeIcon(n.type);
                          return (
                            <Icon
                              style={{
                                width: "1.125rem",
                                height: "1.125rem",
                                color: "var(--color-gray-400)",
                              }}
                            />
                          );
                        })()}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: "0.8125rem",
                            fontWeight: 600,
                            lineHeight: 1.35,
                            color: n.isRead
                              ? "var(--color-text-secondary)"
                              : "var(--color-text)",
                            margin: 0,
                          }}
                        >
                          {n.title}
                        </p>
                        {n.body && (
                          <p
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--color-text-tertiary)",
                              marginTop: "0.125rem",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {n.body}
                          </p>
                        )}
                        <p
                          style={{
                            fontSize: "0.6875rem",
                            color: "var(--color-text-tertiary)",
                            marginTop: "0.25rem",
                          }}
                        >
                          {formatDistanceToNow(new Date(n.createdAt))} ago
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.25rem",
                          flexShrink: 0,
                        }}
                      >
                        {!n.isRead && (
                          <button
                            onClick={() => markOne.mutate(n._id)}
                            style={{
                              padding: "0.25rem",
                              borderRadius: "4px",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              color: "var(--color-primary-600)",
                              display: "flex",
                            }}
                            title="Mark as read"
                          >
                            <Check
                              style={{ width: "0.75rem", height: "0.75rem" }}
                            />
                          </button>
                        )}
                        {n.link && (
                          <Link
                            to={n.link as any}
                            onClick={() => setOpen(false)}
                            style={{
                              padding: "0.25rem",
                              borderRadius: "4px",
                              color: "var(--color-gray-400)",
                              display: "flex",
                            }}
                          >
                            <ExternalLink
                              style={{ width: "0.75rem", height: "0.75rem" }}
                            />
                          </Link>
                        )}
                        <button
                          onClick={() => del.mutate(n._id)}
                          style={{
                            padding: "0.25rem",
                            borderRadius: "4px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--color-gray-300)",
                            display: "flex",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#EF4444";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                              "var(--color-gray-300)";
                          }}
                        >
                          <Trash2
                            style={{ width: "0.75rem", height: "0.75rem" }}
                          />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
