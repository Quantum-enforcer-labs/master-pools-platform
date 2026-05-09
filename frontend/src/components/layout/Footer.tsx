import { Facebook, Instagram, Linkedin, Phone, Twitter } from "lucide-react";
import NewsletterSignup from "../ui/NewsletterSignup";

import { Link } from "@tanstack/react-router";

export default function Footer() {
  const year = new Date().getFullYear();
  const yearsExp = year - 2014;

  return (
    <footer
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        position: "relative",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, var(--color-primary-200), var(--color-secondary-200), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 2rem",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                marginBottom: "1.125rem",
              }}
            >
              <div
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
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
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </Link>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.75,
                marginBottom: "1.25rem",
                maxWidth: "22rem",
              }}
            >
              Zimbabwe's most trusted luxury pool builders since 2014. Crafting
              extraordinary aquatic experiences for residential, commercial, and
              custom projects.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "8px",
                    background: "var(--color-gray-100)",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-gray-400)",
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "var(--color-primary-50)";
                    e.currentTarget.style.color = "var(--color-primary-700)";
                    e.currentTarget.style.borderColor =
                      "var(--color-primary-200)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--color-gray-100)";
                    e.currentTarget.style.color = "var(--color-gray-400)";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                  }}
                >
                  <Icon style={{ width: "0.875rem", height: "0.875rem" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--color-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "1rem",
              }}
            >
              Company
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
              }}
            >
              {[
                { to: "/", l: "Home" },
                { to: "/projects", l: "Projects" },
                { to: "/about", l: "About Us" },
                { to: "/contact", l: "Contact" },
                { to: "/quotation", l: "Get a Quote" },
              ].map(({ to, l }) => (
                <Link
                  key={to}
                  to={to as any}
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary-900)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "var(--color-text-secondary)")
                  }
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Pool types */}
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--color-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "1rem",
              }}
            >
              Pool Types
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
              }}
            >
              {[
                { label: "Residential", type: "residential" },
                { label: "Commercial", type: "commercial" },
                { label: "Infinity Edge", type: "infinity" },
                { label: "Olympic", type: "olympic" },
                { label: "Indoor", type: "indoor" },
                { label: "Natural/Bio", type: "natural" },
              ].map(({ label, type }) => (
                <Link
                  key={type}
                  to="/projects"
                  search={{ poolType: type }}
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary-900)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "var(--color-text-secondary)")
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--color-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "1rem",
              }}
            >
              Contact
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
              }}
            >
              {[
                {
                  Icon: Phone,
                  text: "+263 772 562 125",
                  href: "tel:+263772562125",
                },
                {
                  Icon: Phone,
                  text: "+263 775 206 774",
                  href: "tel:+263775206774",
                },
              ].map(({ Icon, text, href }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.625rem",
                  }}
                >
                  <div
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      borderRadius: "6px",
                      background: "var(--color-primary-50)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      style={{
                        width: "0.75rem",
                        height: "0.75rem",
                        color: "var(--color-primary-700)",
                      }}
                    />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        color: "var(--color-text-secondary)",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                          "var(--color-primary-900)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "var(--color-text-secondary)")
                      }
                    >
                      {text}
                    </a>
                  ) : (
                    <span
                      style={{
                        color: "var(--color-text-secondary)",
                        fontSize: "0.875rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {text}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <Link
              to="/quotation"
              className="btn btn-primary btn-sm"
              style={{
                marginTop: "1.25rem",
                display: "inline-flex",
                gap: "0.375rem",
                textDecoration: "none",
              }}
            >
              Book Consultation
            </Link>
          </div>

          {/* Newsletter */}
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--color-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "1rem",
              }}
            >
              Newsletter
            </p>
            <div>
              <NewsletterSignup />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                color: "var(--color-text-tertiary)",
                fontSize: "0.8125rem",
                margin: 0,
              }}
            >
              © {year} MATERPOOLS AND CONTRUCTION Zimbabwe (Pvt) Ltd. All rights
              reserved.
            </p>
            <p
              style={{
                color: "var(--color-text-tertiary)",
                fontSize: "0.8125rem",
                margin: 0,
              }}
            >
              Established 2014 · {yearsExp} {yearsExp === 1 ? "year" : "years"}{" "}
              experience
            </p>
            <p
              style={{
                color: "var(--color-text-tertiary)",
                fontSize: "0.8125rem",
                margin: 0,
              }}
            >
              Built by{" "}
              <span
                style={{ fontWeight: 600, color: "var(--color-primary-700)" }}
              >
                Aurovex Labs
              </span>
            </p>
          </div>
          <div
            style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}
          >
            <div style={{ display: "flex", gap: "1.25rem" }}>
              {[
                { label: "Privacy Policy", to: "/privacy-policy" },
                { label: "Terms of Service", to: "/terms-of-service" },
                { label: "Cookie Policy", to: "/cookie-policy" },
              ].map(({ label, to }) => (
                <Link
                  key={label}
                  to={to as any}
                  style={{
                    color: "var(--color-text-tertiary)",
                    fontSize: "0.75rem",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color =
                      "var(--color-text-secondary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-tertiary)")
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
