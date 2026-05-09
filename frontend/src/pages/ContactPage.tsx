import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MetaHead } from "../components/seo/MetaHead";
import {
  StructuredData,
  breadcrumbSchema,
  organizationSchema,
} from "../components/seo/StructuredData";
import { useSubmitContact } from "../hooks/useApi";
import type { ContactForm } from "../types";

const fw = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] as any },
});

const INFO = [
  {
    icon: Phone,
    title: "Phone",
    lines: ["+263 772 562 125", "+263 775 206 774"],
    sub: "WhatsApp or call Mon–Fri 8am–5pm · Sat 9am–1pm",
    color: "blue",
  },
  {
    icon: Clock,
    title: "Hours",
    lines: ["Mon–Fri: 8am – 5pm", "Saturday: 9am – 1pm"],
    sub: "Closed Sundays & Public Holidays",
    color: "indigo",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitContact();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    mutate(data, {
      onSuccess: () => {
        setSubmitted(true);
        reset();
        toast.success("Message sent! We'll reply shortly.");
      },
      onError: () => toast.error("Failed to send. Please try again."),
    });
  };

  return (
    <>
      <MetaHead
        title="Contact MATERPOOLS AND CONTRUCTION | Get Your Dream Pool Quote"
        description="Get in touch with our expert team for a free consultation and custom pool quotation."
        canonical="https://www.masterpools.co.zw/contact"
      />
      <StructuredData schema={organizationSchema} />
      <StructuredData
        schema={breadcrumbSchema([
          { name: "Home", url: "https://www.masterpools.co.zw/" },
          { name: "Contact", url: "https://www.masterpools.co.zw/contact" },
        ])}
      />
      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-bg)",
          paddingBottom: "6rem",
        }}
      >
        {/* Header */}
        <section
          style={{
            position: "relative",
            padding: "5rem 1.5rem 4rem",
            textAlign: "center",
            overflow: "hidden",
            background: "#fff",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% -20%, var(--color-primary-50) 0%, transparent 70%)",
              opacity: 0.6,
            }}
          />
          <div
            style={{
              maxWidth: "42rem",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                Reach Out
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(2.25rem,6vw,3.5rem)",
                  fontWeight: 800,
                  color: "var(--color-text)",
                  marginBottom: "1rem",
                  letterSpacing: "-0.03em",
                }}
              >
                Let's <span className="gradient-text">Talk Pools</span>
              </h1>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                  maxWidth: "32rem",
                  margin: "0 auto",
                }}
              >
                Have a question about a project? Want a bespoke quote? Our
                friendly team of experts is ready to help.
              </p>
            </motion.div>
          </div>
        </section>

        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "3rem 1.5rem 0",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
          }}
          className="lg:grid-cols-5"
        >
          {/* Info sidebar */}
          <motion.div
            {...fw(0.1)}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            className="lg:col-span-2"
          >
            {INFO.map(({ icon: Icon, title, lines, sub, color }) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  padding: "1.5rem",
                  background: "#fff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background:
                      color === "blue"
                        ? "var(--color-primary-50)"
                        : "var(--color-secondary-50)",
                    border: `1px solid ${color === "blue" ? "var(--color-primary-100)" : "var(--color-secondary-100)"}`,
                  }}
                >
                  <Icon
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color:
                        color === "blue"
                          ? "var(--color-primary-700)"
                          : "var(--color-secondary-600)",
                    }}
                  />
                </div>
                <div>
                  <h4
                    style={{
                      fontWeight: 700,
                      color: "var(--color-text)",
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {title}
                  </h4>
                  {lines.map((l) => (
                    <p
                      key={l}
                      style={{
                        color: "var(--color-text-secondary)",
                        fontSize: "0.9375rem",
                        margin: "0.25rem 0",
                      }}
                    >
                      {l}
                    </p>
                  ))}
                  <p
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      marginTop: "0.5rem",
                    }}
                  >
                    {sub}
                  </p>
                </div>
              </div>
            ))}

            {/* Live chat prompt */}
            <div
              style={{
                background: "var(--color-primary-900)",
                border: "1px solid var(--color-primary-800)",
                borderRadius: "16px",
                padding: "1.5rem",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                color: "#fff",
                boxShadow: "var(--shadow-primary)",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MessageCircle
                  style={{ width: "1.25rem", height: "1.25rem", color: "#fff" }}
                />
              </div>
              <div>
                <p
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    marginBottom: "0.375rem",
                  }}
                >
                  Prefer live chat?
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Sign in to speak directly with our engineering team via the
                  dashboard chat.
                </p>
                <Link
                  to="/login"
                  style={{
                    color: "#fff",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    marginTop: "0.75rem",
                    textDecoration: "none",
                  }}
                >
                  Sign In Now{" "}
                  <ChevronRight
                    style={{ width: "0.875rem", height: "0.875rem" }}
                  />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.div
            {...fw(0.2)}
            style={{
              background: "#fff",
              border: "1px solid var(--color-border)",
              borderRadius: "20px",
              padding: "2.5rem",
              boxShadow: "var(--shadow-md)",
            }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "4rem 1.5rem" }}>
                <div
                  style={{
                    width: "5.5rem",
                    height: "5.5rem",
                    borderRadius: "50%",
                    background: "var(--color-accent-50)",
                    border: "2px solid var(--color-accent-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <CheckCircle
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                      color: "var(--color-accent-600)",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "var(--color-text)",
                    marginBottom: "0.75rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Message Sent!
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "1.0625rem",
                    marginBottom: "2.5rem",
                    lineHeight: 1.75,
                    maxWidth: "24rem",
                    margin: "0 auto 2.5rem",
                  }}
                >
                  Thank you for reaching out. A copy has been sent to your
                  email, and our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "2rem" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      color: "var(--color-text)",
                      marginBottom: "0.5rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Send Us a Message
                  </h2>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.9375rem",
                    }}
                  >
                    Fields marked with{" "}
                    <span style={{ color: "var(--color-danger)" }}>*</span> are
                    required.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "1.25rem",
                    }}
                    className="sm:grid-cols-2"
                  >
                    <div>
                      <label className="label">
                        Full Name{" "}
                        <span style={{ color: "var(--color-danger)" }}>*</span>
                      </label>
                      <input
                        {...register("name", { required: "Name required" })}
                        className="input"
                        placeholder="John Smith"
                        style={
                          errors.name
                            ? { borderColor: "var(--color-danger)" }
                            : {}
                        }
                      />
                      {errors.name && (
                        <p
                          style={{
                            color: "var(--color-danger)",
                            fontSize: "0.75rem",
                            marginTop: "0.375rem",
                          }}
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="label">
                        Email Address{" "}
                        <span style={{ color: "var(--color-danger)" }}>*</span>
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email",
                          },
                        })}
                        className="input"
                        placeholder="john@example.com"
                        style={
                          errors.email
                            ? { borderColor: "var(--color-danger)" }
                            : {}
                        }
                      />
                      {errors.email && (
                        <p
                          style={{
                            color: "var(--color-danger)",
                            fontSize: "0.75rem",
                            marginTop: "0.375rem",
                          }}
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "1.25rem",
                    }}
                    className="sm:grid-cols-2"
                  >
                    <div>
                      <label className="label">
                        Phone{" "}
                        <span
                          style={{
                            color: "var(--color-text-tertiary)",
                            fontWeight: 400,
                          }}
                        >
                          (optional)
                        </span>
                      </label>
                      <input
                        {...register("phone")}
                        className="input"
                        placeholder="+263 77 000 0000"
                      />
                    </div>
                    <div>
                      <label className="label">
                        Subject{" "}
                        <span style={{ color: "var(--color-danger)" }}>*</span>
                      </label>
                      <select
                        {...register("subject", {
                          required: "Subject required",
                        })}
                        className="select"
                        style={
                          errors.subject
                            ? { borderColor: "var(--color-danger)" }
                            : {}
                        }
                      >
                        <option value="">Select subject</option>
                        {[
                          "General Inquiry",
                          "Request a Quote",
                          "Ongoing Project",
                          "Pool Maintenance",
                          "Partnership",
                          "Other",
                        ].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p
                          style={{
                            color: "var(--color-danger)",
                            fontSize: "0.75rem",
                            marginTop: "0.375rem",
                          }}
                        >
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="label">
                      Message{" "}
                      <span style={{ color: "var(--color-danger)" }}>*</span>
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message required",
                        minLength: {
                          value: 20,
                          message: "At least 20 characters",
                        },
                      })}
                      rows={5}
                      className="textarea"
                      placeholder="Tell us about your project, questions, or how we can help…"
                      style={
                        errors.message
                          ? { borderColor: "var(--color-danger)" }
                          : {}
                      }
                    />
                    {errors.message && (
                      <p
                        style={{
                          color: "var(--color-danger)",
                          fontSize: "0.75rem",
                          marginTop: "0.375rem",
                        }}
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-primary btn-lg"
                    style={{ justifyContent: "center", marginTop: "0.5rem" }}
                  >
                    {isPending ? (
                      <>
                        <span
                          style={{
                            width: "1.125rem",
                            height: "1.125rem",
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTop: "2px solid #fff",
                            borderRadius: "50%",
                            animation: "spin 0.8s linear infinite",
                            display: "inline-block",
                          }}
                        />{" "}
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send
                          style={{ width: "1.125rem", height: "1.125rem" }}
                        />{" "}
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
