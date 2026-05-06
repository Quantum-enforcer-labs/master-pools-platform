import { format, isToday, isYesterday } from "date-fns";
import { motion } from "framer-motion";
import {
  Archive,
  Check,
  CheckCheck,
  FileText,
  MessageCircle,
  Search,
  Send,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useCloseConversation,
  useConversations,
  useMessages,
  useSendMessage,
} from "../../hooks/useApi";
import { useAuthStore } from "../../stores/auth.store";
import type { Conversation, Message } from "../../types";
import { cn } from "../../utils/cn";

const fmt = (d: string) => {
  const dt = new Date(d);
  if (isToday(dt)) return format(dt, "h:mm a");
  if (isYesterday(dt)) return `Yesterday ${format(dt, "h:mm a")}`;
  return format(dt, "MMM d, h:mm a");
};

export default function AdminChat() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const messagesEnd = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  const { data: convData, refetch: refetchConvs } = useConversations();
  const conversations: Conversation[] = (convData as any) || [];
  const filtered = conversations.filter(
    (c) =>
      !search ||
      c.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.subject?.toLowerCase().includes(search.toLowerCase()),
  );

  const { data: msgData, refetch: refetchMsgs } = useMessages(activeId || "");
  const messages: Message[] = msgData?.messages || [];
  const activeConv = conversations.find((c) => c._id === activeId);

  const { mutate: send, isPending: sending } = useSendMessage(activeId || "");
  const closeConv = useCloseConversation();

  useEffect(() => {
    if (conversations.length && !activeId)
      setActiveId(conversations[0]?._id || null);
  }, [conversations]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!input.trim() || !activeId) return;
    send(
      { content: input.trim() },
      {
        onSuccess: () => {
          setInput("");
          refetchMsgs();
          refetchConvs();
        },
      },
    );
  }, [input, activeId]);

  const totalUnread = conversations.reduce(
    (s, c) => s + (c.unreadByAdmin || 0),
    0,
  );

  return (
    <div
      style={{
        height: "calc(100vh - 9rem)",
        display: "flex",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <div
        style={{
          width: "20rem",
          flexShrink: 0,
          borderRight: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          background: "var(--color-gray-50)",
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            padding: "1.25rem",
            borderBottom: "1px solid var(--color-border)",
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <h2
              style={{
                fontWeight: 800,
                color: "var(--color-text)",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              <MessageCircle
                style={{
                  width: "1.125rem",
                  height: "1.125rem",
                  color: "var(--color-primary-900)",
                }}
              />
              Inbox
              {totalUnread > 0 && (
                <span
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    borderRadius: "50%",
                    background: "#EF4444",
                    color: "#fff",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {totalUnread > 9 ? "9+" : totalUnread}
                </span>
              )}
            </h2>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-tertiary)",
                fontWeight: 600,
              }}
            >
              {conversations.length} chats
            </span>
          </div>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "0.875rem",
                height: "0.875rem",
                color: "var(--color-gray-400)",
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client or subject…"
              style={{
                width: "100%",
                padding: "0.5625rem 0.5rem 0.5625rem 2.25rem",
                background: "var(--color-gray-100)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                color: "var(--color-text)",
                fontSize: "0.8125rem",
                outline: "none",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute",
                  right: "0.625rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-gray-400)",
                  padding: 0,
                }}
              >
                <X style={{ width: "0.875rem", height: "0.875rem" }} />
              </button>
            )}
          </div>
        </div>

        {/* Conversation list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem" }}>
          {!filtered.length ? (
            <div style={{ padding: "4rem 1rem", textAlign: "center" }}>
              <div
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  borderRadius: "50%",
                  background: "var(--color-gray-100)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <MessageCircle
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    color: "var(--color-gray-300)",
                  }}
                />
              </div>
              <p
                style={{
                  color: "var(--color-text-tertiary)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                {search ? "No matches found" : "No active conversations"}
              </p>
            </div>
          ) : (
            filtered.map((conv) => (
              <button
                key={conv._id}
                onClick={() => setActiveId(conv._id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.875rem 1rem",
                  borderRadius: "10px",
                  background: activeId === conv._id ? "#fff" : "transparent",
                  border: "1px solid",
                  borderColor:
                    activeId === conv._id
                      ? "var(--color-border)"
                      : "transparent",
                  boxShadow:
                    activeId === conv._id ? "var(--shadow-sm)" : "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  marginBottom: "0.25rem",
                }}
                onMouseEnter={(e) => {
                  if (activeId !== conv._id)
                    e.currentTarget.style.background = "#fff";
                }}
                onMouseLeave={(e) => {
                  if (activeId !== conv._id)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                  }}
                >
                  {/* Avatar */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "8px",
                        background: "var(--color-primary-900)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "0.875rem",
                      }}
                    >
                      {conv.user?.name?.[0]?.toUpperCase()}
                    </div>
                    {conv.status === "open" && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "-1px",
                          right: "-1px",
                          width: "0.75rem",
                          height: "0.75rem",
                          borderRadius: "50%",
                          background: "var(--color-accent-500)",
                          border: "2px solid #fff",
                        }}
                      />
                    )}
                  </div>
                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "0.125rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "var(--color-text)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          margin: 0,
                          flex: 1,
                        }}
                      >
                        {conv.user?.name}
                      </p>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          color: "var(--color-text-tertiary)",
                          flexShrink: 0,
                          fontWeight: 500,
                        }}
                      >
                        {conv.lastMessageAt ? fmt(conv.lastMessageAt) : ""}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color:
                          conv.unreadByAdmin > 0
                            ? "var(--color-text)"
                            : "var(--color-text-secondary)",
                        fontWeight: conv.unreadByAdmin > 0 ? 600 : 400,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        margin: 0,
                      }}
                    >
                      {conv.lastMessage || conv.subject}
                    </p>
                  </div>
                  {/* Unread badge */}
                  {conv.unreadByAdmin > 0 && (
                    <span
                      style={{
                        width: "1.25rem",
                        height: "1.25rem",
                        borderRadius: "50%",
                        background: "var(--color-primary-900)",
                        color: "#fff",
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {conv.unreadByAdmin}
                    </span>
                  )}
                </div>
                {conv.quotation && (
                  <div style={{ marginTop: "0.5rem", marginLeft: "3.375rem" }}>
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        color: "var(--color-primary-700)",
                        background: "var(--color-primary-50)",
                        border: "1px solid var(--color-primary-100)",
                        borderRadius: "6px",
                        padding: "0.125rem 0.5rem",
                        fontWeight: 600,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <FileText
                          style={{ width: "0.7rem", height: "0.7rem" }}
                        />{" "}
                        Quotation linked
                      </span>
                    </span>
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── Chat Area ────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {!activeId ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1.25rem",
              background: "var(--color-gray-50)",
            }}
          >
            <div
              style={{
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
                background: "#fff",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <MessageCircle
                style={{
                  width: "2rem",
                  height: "2rem",
                  color: "var(--color-gray-200)",
                }}
              />
            </div>
            <p
              style={{
                color: "var(--color-text-tertiary)",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Select a client to start chatting
            </p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div
              style={{
                padding: "1rem 1.5rem",
                borderBottom: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  borderRadius: "10px",
                  background: "var(--color-primary-900)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1rem",
                }}
              >
                {activeConv?.user?.name?.[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: 800,
                    color: "var(--color-text)",
                    fontSize: "1rem",
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {activeConv?.user?.name}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <p
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontSize: "0.8125rem",
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    {activeConv?.user?.email}
                  </p>
                  {activeConv?.status === "open" && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-accent-600)",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <span
                        style={{
                          width: "0.375rem",
                          height: "0.375rem",
                          borderRadius: "50%",
                          background: "var(--color-accent-500)",
                        }}
                      />{" "}
                      Active
                    </span>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.625rem",
                  alignItems: "center",
                }}
              >
                <span
                  className={cn(
                    "badge",
                    activeConv?.status === "open"
                      ? "badge-green"
                      : "badge-gray",
                  )}
                  style={{ textTransform: "capitalize" }}
                >
                  {activeConv?.status}
                </span>
                {activeConv?.status === "open" && (
                  <button
                    onClick={() =>
                      closeConv.mutate(activeId, {
                        onSuccess: () => refetchConvs(),
                      })
                    }
                    className="btn btn-secondary btn-sm"
                    style={{ gap: "0.375rem" }}
                  >
                    <Archive
                      style={{ width: "0.875rem", height: "0.875rem" }}
                    />{" "}
                    Close Chat
                  </button>
                )}
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                background: "var(--color-gray-50)",
              }}
            >
              {!messages.length ? (
                <div style={{ textAlign: "center", padding: "4rem 0" }}>
                  <p
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    No messages yet. Send a welcome message!
                  </p>
                </div>
              ) : (
                messages.map((msg: Message, idx: number) => {
                  const isAdmin = msg.senderRole === "admin";
                  const showDate =
                    idx === 0 ||
                    format(
                      new Date(messages[idx - 1].createdAt),
                      "yyyy-MM-dd",
                    ) !== format(new Date(msg.createdAt), "yyyy-MM-dd");
                  return (
                    <div key={msg._id}>
                      {showDate && (
                        <div
                          style={{ textAlign: "center", margin: "1.5rem 0" }}
                        >
                          <span
                            style={{
                              fontSize: "0.6875rem",
                              color: "var(--color-text-tertiary)",
                              background: "#fff",
                              padding: "0.25rem 0.875rem",
                              borderRadius: "999px",
                              border: "1px solid var(--color-border)",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {isToday(new Date(msg.createdAt))
                              ? "Today"
                              : isYesterday(new Date(msg.createdAt))
                                ? "Yesterday"
                                : format(
                                    new Date(msg.createdAt),
                                    "EEEE, MMM d",
                                  )}
                          </span>
                        </div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          display: "flex",
                          justifyContent: isAdmin ? "flex-end" : "flex-start",
                        }}
                      >
                        <div style={{ maxWidth: "70%" }}>
                          {!isAdmin && (
                            <p
                              style={{
                                fontSize: "0.6875rem",
                                color: "var(--color-primary-700)",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                marginBottom: "0.25rem",
                                marginLeft: "0.25rem",
                              }}
                            >
                              {msg.sender?.name}
                            </p>
                          )}
                          <div
                            style={{
                              background: isAdmin
                                ? "var(--color-primary-900)"
                                : "#fff",
                              color: isAdmin ? "#fff" : "var(--color-text)",
                              border: isAdmin
                                ? "none"
                                : "1px solid var(--color-border)",
                              borderRadius: isAdmin
                                ? "14px 14px 2px 14px"
                                : "14px 14px 14px 2px",
                              padding: "0.75rem 1rem",
                              boxShadow: isAdmin
                                ? "0 4px 12px rgba(30,58,138,0.15)"
                                : "0 2px 6px rgba(0,0,0,0.04)",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "0.9375rem",
                                lineHeight: 1.5,
                                margin: 0,
                              }}
                            >
                              {msg.content}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.375rem",
                              justifyContent: isAdmin
                                ? "flex-end"
                                : "flex-start",
                              marginTop: "0.375rem",
                              padding: "0 0.25rem",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "0.6875rem",
                                color: "var(--color-text-tertiary)",
                                fontWeight: 600,
                                margin: 0,
                              }}
                            >
                              {fmt(msg.createdAt)}
                            </p>
                            {isAdmin &&
                              (msg.isRead ? (
                                <CheckCheck
                                  style={{
                                    width: "0.875rem",
                                    height: "0.875rem",
                                    color: "var(--color-primary-500)",
                                  }}
                                />
                              ) : (
                                <Check
                                  style={{
                                    width: "0.875rem",
                                    height: "0.875rem",
                                    color: "var(--color-gray-300)",
                                  }}
                                />
                              ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEnd} />
            </div>

            {/* Input Panel */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderTop: "1px solid var(--color-border)",
                background: "#fff",
              }}
            >
              {activeConv?.status === "closed" ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "0.75rem",
                    background: "var(--color-gray-50)",
                    borderRadius: "10px",
                    border: "1px dashed var(--color-border)",
                  }}
                >
                  <p
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    This conversation is archived.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-end",
                  }}
                >
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={`Reply to ${activeConv?.user?.name?.split(" ")[0]}…`}
                    rows={2}
                    style={{
                      flex: 1,
                      background: "var(--color-gray-50)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "12px",
                      padding: "0.75rem 1.125rem",
                      color: "var(--color-text)",
                      fontSize: "0.9375rem",
                      outline: "none",
                      resize: "none",
                      fontFamily: "var(--font-sans)",
                      lineHeight: 1.5,
                      transition: "all 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-primary-300)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(30,58,138,0.06)";
                      e.target.style.background = "#fff";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--color-border)";
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "var(--color-gray-50)";
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSend}
                    disabled={!input.trim() || sending}
                    style={{
                      width: "3.25rem",
                      height: "3.25rem",
                      borderRadius: "12px",
                      background: "var(--color-primary-900)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                      boxShadow: "var(--shadow-primary)",
                      opacity: !input.trim() || sending ? 0.6 : 1,
                    }}
                  >
                    {sending ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send style={{ width: "1.25rem", height: "1.25rem" }} />
                    )}
                  </motion.button>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "0.75rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-tertiary)",
                    fontWeight: 500,
                  }}
                >
                  Shift + Enter for new line
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    color: "var(--color-text-tertiary)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  <CheckCheck
                    style={{ width: "0.875rem", height: "0.875rem" }}
                  />
                  Encryption active
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
