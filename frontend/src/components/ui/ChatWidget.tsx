import { Link } from "@tanstack/react-router";
import { format, isToday, isYesterday } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCheck,
  ChevronDown,
  GraduationCap,
  MessageCircle,
  Minimize2,
  Send,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useConversations,
  useMessages,
  useSendMessage,
} from "../../hooks/useApi";
import { useAuthStore } from "../../stores/auth.store";
import { useUIStore } from "../../stores/ui.store";
import type { Conversation, Message } from "../../types";

const formatMsgTime = (date: string) => {
  const d = new Date(date);
  if (isToday(d)) return format(d, "h:mm a");
  if (isYesterday(d)) return `Yesterday ${format(d, "h:mm a")}`;
  return format(d, "MMM d, h:mm a");
};

export default function ChatWidget() {
  const { chatOpen, setChatOpen, activeConversationId, setActiveConversation } =
    useUIStore();
  const { user } = useAuthStore();
  const [input, setInput] = useState("");
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { data: convData } = useConversations();
  const conversations: Conversation[] = (convData as any) || [];
  const activeConv = activeConversationId || conversations[0]?._id;

  const { data: msgData, refetch } = useMessages(activeConv || "");
  const messages: Message[] = msgData?.messages || [];
  const { mutate: sendMsg, isPending: sending } = useSendMessage(
    activeConv || "",
  );

  const totalUnread = conversations.reduce(
    (s, c) => s + (c.unreadByUser || 0),
    0,
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (chatOpen && !minimized) setTimeout(scrollToBottom, 300);
  }, [chatOpen, minimized]);

  const handleSend = () => {
    if (!input.trim() || !activeConv) return;
    sendMsg(
      { content: input.trim() },
      {
        onSuccess: () => {
          setInput("");
          refetch();
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ── Trigger Button ────────────────────────────────── */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setChatOpen(!chatOpen);
          setMinimized(false);
        }}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 50,
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "1rem",
          background: "var(--color-primary-900)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(30,58,138,0.3)",
          transition: "transform 0.2s ease",
        }}
      >
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <X style={{ width: "1.5rem", height: "1.5rem" }} />
            </motion.div>
          ) : (
            <motion.div
              key="msg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <MessageCircle style={{ width: "1.5rem", height: "1.5rem" }} />
            </motion.div>
          )}
        </AnimatePresence>
        {!chatOpen && totalUnread > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-0.375rem",
              right: "-0.375rem",
              width: "1.375rem",
              height: "1.375rem",
              borderRadius: "50%",
              background: "#EF4444",
              color: "#fff",
              fontSize: "0.6875rem",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #fff",
            }}
          >
            {totalUnread}
          </span>
        )}
      </motion.button>

      {/* ── Chat Window ─────────────────────────────────── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
            style={{
              position: "fixed",
              bottom: "5.5rem",
              right: "1.5rem",
              zIndex: 50,
              width: "24rem",
              maxWidth: "calc(100vw - 3rem)",
              height: minimized ? "auto" : "34rem",
              maxHeight: "calc(100vh - 8rem)",
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid var(--color-border)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "var(--color-primary-900)",
                padding: "1.125rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GraduationCap
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color: "#fff",
                    }}
                  />
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: "-1px",
                    right: "-1px",
                    width: "0.75rem",
                    height: "0.75rem",
                    borderRadius: "50%",
                    background: "var(--color-accent-500)",
                    border: "2px solid var(--color-primary-900)",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 800,
                    color: "#fff",
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  MATERPOOLS AND CONTRUCTION Support
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.6)",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  Typically replies within minutes
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <button
                  onClick={() => setMinimized(!minimized)}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "8px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.4)",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                >
                  {minimized ? (
                    <ChevronDown
                      style={{
                        width: "1.125rem",
                        height: "1.125rem",
                        transform: "rotate(180deg)",
                      }}
                    />
                  ) : (
                    <Minimize2 style={{ width: "1rem", height: "1rem" }} />
                  )}
                </button>
                <button
                  onClick={() => setChatOpen(false)}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "8px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.4)",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                >
                  <X style={{ width: "1.125rem", height: "1.125rem" }} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!minimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  {/* Selector if multiple */}
                  {conversations.length > 1 && (
                    <div
                      style={{
                        padding: "0.625rem 1rem",
                        background: "var(--color-gray-50)",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      <select
                        value={activeConv || ""}
                        onChange={(e) => setActiveConversation(e.target.value)}
                        style={{
                          width: "100%",
                          background: "#fff",
                          border: "1px solid var(--color-border)",
                          borderRadius: "8px",
                          padding: "0.375rem 0.625rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--color-text-secondary)",
                          outline: "none",
                        }}
                      >
                        {conversations.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Messages Area */}
                  <div
                    style={{
                      flex: 1,
                      overflowY: "auto",
                      padding: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.875rem",
                      background: "var(--color-gray-50)",
                    }}
                    className="scrollbar-hide"
                  >
                    {!activeConv ? (
                      <div
                        style={{ textAlign: "center", padding: "4rem 1rem" }}
                      >
                        <div
                          style={{
                            width: "4rem",
                            height: "4rem",
                            borderRadius: "50%",
                            background: "#fff",
                            border: "1px solid var(--color-border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 1.25rem",
                            boxShadow: "var(--shadow-sm)",
                          }}
                        >
                          <MessageCircle
                            style={{
                              width: "1.75rem",
                              height: "1.75rem",
                              color: "var(--color-gray-200)",
                            }}
                          />
                        </div>
                        <p
                          style={{
                            color: "var(--color-text-secondary)",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                          }}
                        >
                          Start your first conversation
                        </p>
                        <p
                          style={{
                            color: "var(--color-text-tertiary)",
                            fontSize: "0.75rem",
                            marginTop: "0.375rem",
                          }}
                        >
                          Submit a quote request to enable real-time engineering
                          chat.
                        </p>
                      </div>
                    ) : !messages.length ? (
                      <div
                        style={{ textAlign: "center", padding: "2rem 1rem" }}
                      >
                        <p
                          style={{
                            color: "var(--color-text-tertiary)",
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                          }}
                        >
                          Sending your message to our designers...
                        </p>
                      </div>
                    ) : (
                      messages.map((msg, idx) => {
                        const isMe = msg.sender?._id === user?._id;
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
                                style={{
                                  textAlign: "center",
                                  margin: "1rem 0",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "0.625rem",
                                    fontWeight: 800,
                                    color: "var(--color-text-tertiary)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                  }}
                                >
                                  {isToday(new Date(msg.createdAt))
                                    ? "Today"
                                    : format(
                                        new Date(msg.createdAt),
                                        "EEEE, MMM d",
                                      )}
                                </span>
                              </div>
                            )}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: isMe
                                  ? "flex-end"
                                  : "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  maxWidth: "85%",
                                  padding: "0.6875rem 0.875rem",
                                  borderRadius: isMe
                                    ? "14px 14px 2px 14px"
                                    : "14px 14px 14px 2px",
                                  background: isMe
                                    ? "var(--color-primary-900)"
                                    : "#fff",
                                  color: isMe ? "#fff" : "var(--color-text)",
                                  border: isMe
                                    ? "none"
                                    : "1px solid var(--color-border)",
                                  boxShadow: isMe
                                    ? "0 4px 12px rgba(30,58,138,0.15)"
                                    : "0 1px 3px rgba(0,0,0,0.04)",
                                }}
                              >
                                {!isMe && (
                                  <p
                                    style={{
                                      fontSize: "0.625rem",
                                      fontWeight: 800,
                                      color: "var(--color-primary-700)",
                                      textTransform: "uppercase",
                                      letterSpacing: "0.06em",
                                      marginBottom: "0.125rem",
                                    }}
                                  >
                                    MATERPOOLS AND CONTRUCTION
                                  </p>
                                )}
                                <p
                                  style={{
                                    fontSize: "0.875rem",
                                    lineHeight: 1.5,
                                    margin: 0,
                                  }}
                                >
                                  {msg.content}
                                </p>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.25rem",
                                    justifyContent: isMe
                                      ? "flex-end"
                                      : "flex-start",
                                    marginTop: "0.25rem",
                                    opacity: 0.6,
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: "0.625rem",
                                      fontWeight: 600,
                                      margin: 0,
                                    }}
                                  >
                                    {formatMsgTime(msg.createdAt)}
                                  </p>
                                  {isMe &&
                                    (msg.isRead ? (
                                      <CheckCheck
                                        style={{
                                          width: "0.75rem",
                                          height: "0.75rem",
                                        }}
                                      />
                                    ) : (
                                      <Check
                                        style={{
                                          width: "0.75rem",
                                          height: "0.75rem",
                                        }}
                                      />
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Panel */}
                  <div
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid var(--color-border)",
                      background: "#fff",
                    }}
                  >
                    {!activeConv ? (
                      <div style={{ padding: "0.5rem", textAlign: "center" }}>
                        <Link
                          to="/quotation"
                          style={{
                            color: "var(--color-primary-700)",
                            fontSize: "0.8125rem",
                            fontWeight: 700,
                            textDecoration: "none",
                          }}
                        >
                          Get a detailed quote first →
                        </Link>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          gap: "0.75rem",
                          alignItems: "flex-end",
                        }}
                      >
                        <textarea
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your message…"
                          rows={1}
                          style={{
                            flex: 1,
                            background: "var(--color-gray-50)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "12px",
                            padding: "0.625rem 1rem",
                            fontSize: "0.875rem",
                            color: "var(--color-text)",
                            outline: "none",
                            resize: "none",
                            fontFamily: "var(--font-sans)",
                            lineHeight: 1.5,
                            maxHeight: "100px",
                            transition: "all 0.2s ease",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor =
                              "var(--color-primary-300)";
                            e.target.style.background = "#fff";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "var(--color-border)";
                            e.target.style.background = "var(--color-gray-50)";
                          }}
                        />
                        <button
                          onClick={handleSend}
                          disabled={!input.trim() || sending}
                          style={{
                            width: "2.75rem",
                            height: "2.75rem",
                            borderRadius: "10px",
                            background: "var(--color-primary-900)",
                            border: "none",
                            cursor: "pointer",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            boxShadow: "var(--shadow-primary)",
                            opacity: !input.trim() || sending ? 0.5 : 1,
                          }}
                        >
                          {sending ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Send
                              style={{ width: "1.125rem", height: "1.125rem" }}
                            />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
