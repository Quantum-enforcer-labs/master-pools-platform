import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
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
            Terms of Service
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
          {/* Acceptance of Terms */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              1. Acceptance of Terms
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              By accessing and using the MATERPOOLS AND CONTRUCTION website and services, you
              accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do
              not use this service.
            </p>
          </motion.section>

          {/* Use License */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              2. Use License
            </h2>
            <p
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                marginBottom: "0.75rem",
              }}
            >
              Permission is granted to temporarily download one copy of the
              materials (information or software) on MATERPOOLS AND CONTRUCTION for personal,
              non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may
              not:
            </p>
            <ul
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                paddingLeft: "1.5rem",
              }}
            >
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>
                Transfer the materials to another person or "mirror" the
                materials on any other server
              </li>
            </ul>
          </motion.section>

          {/* Disclaimer */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              3. Disclaimer
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              The materials on MATERPOOLS AND CONTRUCTION's website are provided on an 'as is'
              basis. MATERPOOLS AND CONTRUCTION makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </motion.section>

          {/* Limitations */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              4. Limitations of Liability
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              In no event shall MATERPOOLS AND CONTRUCTION or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on MATERPOOLS AND CONTRUCTION's website, even
              if MATERPOOLS AND CONTRUCTION or an authorized representative has been notified
              orally or in writing of the possibility of such damage.
            </p>
          </motion.section>

          {/* User Content */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              5. User Content
            </h2>
            <p
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                marginBottom: "0.75rem",
              }}
            >
              You are responsible for all content you post on MATERPOOLS AND CONTRUCTION,
              including:
            </p>
            <ul
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                paddingLeft: "1.5rem",
              }}
            >
              <li>Ensuring it is accurate and not misleading</li>
              <li>Not violating any laws or third-party rights</li>
              <li>Not containing malware or harmful code</li>
              <li>Not harassing or threatening other users</li>
            </ul>
          </motion.section>

          {/* Account Responsibility */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              6. Account Responsibility
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              You are responsible for maintaining the confidentiality of your
              account credentials and password. You agree to accept
              responsibility for all activities that occur under your account.
              You must notify us immediately of any unauthorized use of your
              account.
            </p>
          </motion.section>

          {/* Modifications to Service */}
          <motion.section variants={itemVariants}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              7. Modifications to Service
            </h2>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              MATERPOOLS AND CONTRUCTION may revise these terms of service for its website at
              any time without notice. By using this website, you are agreeing
              to be bound by the then current version of these terms of service.
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
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                marginBottom: "0.75rem",
              }}
            >
              If you have questions about these Terms of Service, please contact
              us at{" "}
              <a
                href="mailto:legal@masterpools.com"
                style={{
                  color: "var(--color-primary-900)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                legal@masterpools.com
              </a>
              .
            </p>
            <p
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
            >
              For information about how we handle your data, see our{" "}
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
              . For details about cookies, see our{" "}
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
        </motion.div>

        {/* Footer spacer */}
        <div style={{ marginTop: "4rem" }} />
      </motion.div>
    </div>
  );
}
