import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function CookiePolicyPage() {
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
            Cookie Policy
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
          {/* What Are Cookies */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              1. What Are Cookies?
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              Cookies are small files stored on your device when you visit a
              website. They contain information that helps us recognize you and
              remember your preferences. Cookies can be either permanent
              (persistent) or temporary (session) in nature.
            </p>
          </motion.section>

          {/* How We Use Cookies */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              2. How We Use Cookies
            </h2>
            <div
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              <p style={{ marginBottom: "0.75rem" }}>
                <strong>Essential Cookies:</strong> Required for website
                functionality, including authentication and security features.
              </p>
              <p style={{ marginBottom: "0.75rem" }}>
                <strong>Preference Cookies:</strong> Remember your choices such
                as language and display preferences.
              </p>
              <p style={{ marginBottom: "0.75rem" }}>
                <strong>Analytics Cookies:</strong> Help us understand how you
                use our website to improve performance and user experience.
              </p>
              <p>
                <strong>Marketing Cookies:</strong> Track your activity to show
                relevant advertisements and measure campaign effectiveness.
              </p>
            </div>
          </motion.section>

          {/* Types of Cookies We Use */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              3. Types of Cookies We Use
            </h2>
            <ul
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                paddingLeft: "1.5rem",
              }}
            >
              <li>
                <strong>Session Cookies:</strong> Temporary cookies that expire
                when you close your browser
              </li>
              <li>
                <strong>Persistent Cookies:</strong> Remain on your device for a
                specified period or until manually deleted
              </li>
              <li>
                <strong>First-party Cookies:</strong> Set by MATERPOOLS AND CONTRUCTION
                directly
              </li>
              <li>
                <strong>Third-party Cookies:</strong> Set by our partners for
                analytics and advertising purposes
              </li>
            </ul>
          </motion.section>

          {/* Third-party Cookies */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              4. Third-party Cookies
            </h2>
            <p
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                marginBottom: "0.75rem",
              }}
            >
              We use third-party services that may set their own cookies:
            </p>
            <ul
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                paddingLeft: "1.5rem",
              }}
            >
              <li>Google Analytics for website usage statistics</li>
              <li>Email services for marketing and communication</li>
              <li>Social media integrations for sharing and tracking</li>
            </ul>
          </motion.section>

          {/* Managing Cookies */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              5. Managing Your Cookies
            </h2>
            <p
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                marginBottom: "0.75rem",
              }}
            >
              You have the right to control cookies through your browser
              settings. Most browsers allow you to:
            </p>
            <ul
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                paddingLeft: "1.5rem",
              }}
            >
              <li>Accept or reject cookies</li>
              <li>Choose which cookies to allow</li>
              <li>Delete cookies from your device</li>
              <li>Receive notifications when cookies are set</li>
            </ul>
            <p
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                marginTop: "0.75rem",
              }}
            >
              Note: Disabling essential cookies may affect website
              functionality.
            </p>
          </motion.section>

          {/* Do Not Track */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              6. Do Not Track
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              Some browsers include a "Do Not Track" feature. We currently do
              not respond to Do Not Track signals, as there is no industry
              standard for their implementation.
            </p>
          </motion.section>

          {/* Policy Updates */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              7. Updates to This Policy
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              We may update this Cookie Policy at any time. Continued use of our
              website after changes constitutes your acceptance of the updated
              policy.
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
              8. Contact Us
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              If you have questions about our use of cookies, please contact us
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
              . For more information about our data practices, see our{" "}
              <Link
                to="/privacy-policy"
                style={{
                  color: "var(--color-primary-900)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Privacy Policy
              </Link>
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
