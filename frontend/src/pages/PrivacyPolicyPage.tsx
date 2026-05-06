import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        padding: "2rem 1rem",
      }}
    >
      <motion.div
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back button */}
        <motion.div variants={itemVariants} style={{ marginBottom: "2rem" }}>
          <Link to="/">
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "none",
                border: "none",
                color: "var(--color-primary-900)",
                cursor: "pointer",
                fontSize: "0.9375rem",
                fontWeight: 600,
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) =>
                ((e.target as HTMLButtonElement).style.opacity = "0.7")
              }
              onMouseOut={(e) =>
                ((e.target as HTMLButtonElement).style.opacity = "1")
              }
            >
              <ArrowLeft style={{ width: "1rem", height: "1rem" }} />
              Back to Home
            </button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: "3rem",
            borderBottom: "2px solid var(--color-border)",
            paddingBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "0.9375rem",
            }}
          >
            Last updated: May 6, 2026
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {/* Introduction */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              1. Introduction
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              MATERPOOLS AND CONTRUCTION ("we", "our", or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website and use our services.
            </p>
          </motion.section>

          {/* Information We Collect */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              2. Information We Collect
            </h2>
            <div
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              <p style={{ marginBottom: "0.75rem" }}>
                <strong>Personal Information:</strong> Name, email address,
                phone number, company name, and other information you provide
                when creating an account or submitting a quotation request.
              </p>
              <p style={{ marginBottom: "0.75rem" }}>
                <strong>Device Information:</strong> IP address, browser type,
                operating system, and pages visited.
              </p>
              <p>
                <strong>Usage Data:</strong> Information about how you interact
                with our website, including the time and duration of visits.
              </p>
            </div>
          </motion.section>

          {/* How We Use Your Information */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              3. How We Use Your Information
            </h2>
            <ul
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                paddingLeft: "1.5rem",
              }}
            >
              <li>To process quotation requests and provide services</li>
              <li>To send account verification and password reset emails</li>
              <li>To communicate project updates and respond to inquiries</li>
              <li>To improve our website and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </motion.section>

          {/* Data Security */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              4. Data Security
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the internet or electronic storage is completely
              secure.
            </p>
          </motion.section>

          {/* Your Rights */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              5. Your Rights
            </h2>
            <p
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                marginBottom: "0.75rem",
              }}
            >
              Depending on your location, you may have the right to:
            </p>
            <ul
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                paddingLeft: "1.5rem",
              }}
            >
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </motion.section>

          {/* Cookies */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              6. Cookies
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              We use cookies to enhance your experience. For more information,
              see our{" "}
              <Link
                to="/cookie-policy"
                style={{
                  color: "var(--color-primary-900)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Cookie Policy
              </Link>
              .
            </p>
          </motion.section>

          {/* Contact Us */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              7. Contact Us
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              If you have questions about this Privacy Policy, please contact us
              at{" "}
              <a
                href="mailto:privacy@masterpools.com"
                style={{
                  color: "var(--color-primary-900)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                privacy@masterpools.com
              </a>
              .
            </p>
          </motion.section>
        </motion.div>

        {/* Footer spacer */}
        <div style={{ marginTop: "4rem" }} />
      </motion.div>
    </div>
  );
}
