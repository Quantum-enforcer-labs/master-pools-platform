import {
  ArrowRight,
  Award,
  CheckCircle,
  Droplets,
  Globe,
  Users,
  Wrench,
} from "lucide-react";

import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MetaHead } from "../components/seo/MetaHead";
import {
  StructuredData,
  breadcrumbSchema,
  organizationSchema,
} from "../components/seo/StructuredData";

const fw = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as any },
});

const TEAM = [
  {
    name: "Dominic Chitewe",
    role: "Founder & CEO",
    bio: "20+ years in aquatic construction. Built MATERPOOLS AND CONTRUCTION on a foundation of trust and craftsmanship.",
    initials: "DC",
  },
  {
    name: "Tinashe Sango",
    role: "Lead Builder",
    bio: "Award-winning builder renowned for executing flawless construction and delivering exceptional results.",
    initials: "TS",
  },
  {
    name: "Lloyd",
    role: "Site Manager",
    bio: "Seasoned site manager overseeing project execution, timeline management, and on-site coordination.",
    initials: "LM",
  },
  {
    name: "Prosper Chitewe",
    role: "Client Relations",
    bio: "Your dedicated project liaison from first contact to final handover and beyond.",
    initials: "PC",
  },
];

const VALUES = [
  {
    icon: Award,
    title: "Excellence",
    desc: "We never compromise. Every tile, pipe, and fitting is chosen for quality and longevity.",
    color: "blue",
  },
  {
    icon: Users,
    title: "Partnership",
    desc: "Your project is our project. We work alongside you at every stage of the build.",
    color: "indigo",
  },
  {
    icon: Wrench,
    title: "Craftsmanship",
    desc: "Skilled artisans who take genuine pride in what they build every single day.",
    color: "blue",
  },
  {
    icon: Globe,
    title: "Sustainability",
    desc: "Energy-efficient systems and eco-friendly materials wherever possible.",
    color: "indigo",
  },
  {
    icon: Droplets,
    title: "Innovation",
    desc: "Smart pool systems, solar heating, and cutting-edge filtration technology.",
    color: "blue",
  },
  {
    icon: CheckCircle,
    title: "Reliability",
    desc: "On time, on budget. We honour our commitments to every client we serve.",
    color: "indigo",
  },
];

export default function AboutPage() {
  const yearsExp = new Date().getFullYear() - 2014;
  const completedProjects = 150;
  return (
    <>
      <MetaHead
        title="About MATERPOOLS AND CONTRUCTION | Zimbabwe's Pool Construction Leaders"
        description="Learn about MATERPOOLS AND CONTRUCTION' 20+ years of expertise in luxury pool design and construction."
        canonical="https://masterpools.co.zw/about"
      />
      <StructuredData schema={organizationSchema} />
      <StructuredData
        schema={breadcrumbSchema([
          { name: "Home", url: "https://masterpools.co.zw/" },
          { name: "About", url: "https://masterpools.co.zw/about" },
        ])}
      />
      <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
        {/* Hero */}
        <section
          style={{
            position: "relative",
            padding: "7rem 1.5rem 5rem",
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
              maxWidth: "48rem",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <motion.div {...fw(0)}>
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                Our Story
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(2.25rem,6vw,3.75rem)",
                  fontWeight: 800,
                  color: "var(--color-text)",
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.03em",
                }}
              >
                Passion for Pools,
                <br />
                <span className="gradient-text">
                  Built Over {yearsExp} Years
                </span>
              </h1>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "1.125rem",
                  lineHeight: 1.75,
                  marginBottom: "2.5rem",
                }}
              >
                MATERPOOLS AND CONTRUCTION was founded in 2014 with a single mission: to bring
                world-class aquatic construction to Zimbabwe. From our first
                residential pool in Harare to major resort complexes, our
                commitment to excellence has never wavered.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  to="/projects"
                  className="btn btn-primary btn-lg"
                  style={{ textDecoration: "none" }}
                >
                  See Our Work{" "}
                  <ArrowRight
                    style={{ width: "1.125rem", height: "1.125rem" }}
                  />
                </Link>
                <Link
                  to="/quotation"
                  className="btn btn-secondary btn-lg"
                  style={{ textDecoration: "none" }}
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats bar */}
        <section
          style={{
            background: "#fff",
            borderBottom: "1px solid var(--color-border)",
            padding: "3rem 1.5rem",
          }}
        >
          <div
            style={{
              maxWidth: "64rem",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "2.5rem",
            }}
            className="md:grid-cols-4"
          >
            {[
              { value: `${completedProjects}+`, label: "Pools Completed" },
              { value: `${yearsExp}+`, label: "Years Experience" },
              { value: "1", label: "Country Served" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                {...fw(i * 0.08)}
                style={{ textAlign: "center" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(2rem,5vw,3rem)",
                    fontWeight: 800,
                    color: "var(--color-primary-900)",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    color: "var(--color-text-tertiary)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section style={{ padding: "6rem 1.5rem" }}>
          <div
            style={{
              maxWidth: "72rem",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "4rem",
              alignItems: "center",
            }}
            className="md:grid-cols-2"
          >
            <motion.div {...fw(0)}>
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                Our Mission
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.75rem,4vw,2.75rem)",
                  fontWeight: 800,
                  color: "var(--color-text)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                Turning Spaces Into
                <br />
                <span className="gradient-text">Aquatic Masterpieces</span>
              </h2>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}
              >
                At MATERPOOLS AND CONTRUCTION, we believe a swimming pool is more than just a
                structure — it's a centrepiece of life, a place for families to
                bond, athletes to train, and individuals to find peace.
              </p>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                We combine cutting-edge engineering with artistic design to
                create pools that don't just function flawlessly — they inspire.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                }}
              >
                {[
                  "Bespoke architectural design for every client",
                  "Premium, commercial-grade materials only",
                  "Transparent project management via our portal",
                  "10-year structural warranty on all shells",
                  "Comprehensive post-completion maintenance",
                ].map((p) => (
                  <div
                    key={p}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.875rem",
                    }}
                  >
                    <div
                      style={{
                        width: "1.375rem",
                        height: "1.375rem",
                        borderRadius: "50%",
                        background: "var(--color-accent-50)",
                        border: "1px solid var(--color-accent-100)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <CheckCircle
                        style={{
                          width: "0.875rem",
                          height: "0.875rem",
                          color: "var(--color-accent-600)",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "var(--color-text-secondary)",
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                      }}
                    >
                      {p}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Values Grid */}
            <motion.div
              {...fw(0.15)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {VALUES.map(({ icon: Icon, title, desc, color }) => (
                <div
                  key={title}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--color-border)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    transition: "all 0.3s ease",
                    boxShadow: "var(--shadow-sm)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--color-primary-200)";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  }}
                >
                  <div
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
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
                  <h4
                    style={{
                      fontWeight: 700,
                      color: "var(--color-text)",
                      fontSize: "0.9375rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {title}
                  </h4>
                  <p
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontSize: "0.75rem",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section
          style={{
            padding: "6rem 1.5rem",
            background: "#fff",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
            <motion.div
              {...fw(0)}
              style={{ textAlign: "center", marginBottom: "4rem" }}
            >
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                The Team
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.75rem,4vw,3rem)",
                  fontWeight: 800,
                  color: "var(--color-text)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Meet the Experts Behind{" "}
                <span className="gradient-text">Every Build</span>
              </h2>
            </motion.div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: "1.5rem",
              }}
            >
              {TEAM.map(({ name, role, bio, initials }, i) => (
                <motion.div
                  key={name}
                  {...fw(i * 0.1)}
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "18px",
                    padding: "2rem",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--color-primary-200)";
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.background = "var(--color-bg)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: "4.5rem",
                      height: "4.5rem",
                      borderRadius: "14px",
                      background: "var(--color-primary-900)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.5rem",
                      fontWeight: 800,
                      color: "#fff",
                      fontSize: "1.25rem",
                      boxShadow: "0 4px 12px rgba(30,58,138,0.2)",
                    }}
                  >
                    {initials}
                  </div>
                  <h4
                    style={{
                      fontWeight: 700,
                      color: "var(--color-text)",
                      marginBottom: "0.25rem",
                      fontSize: "1.125rem",
                    }}
                  >
                    {name}
                  </h4>
                  <p
                    style={{
                      color: "var(--color-primary-600)",
                      fontSize: "0.8125rem",
                      marginBottom: "1.25rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {role}
                  </p>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: "7rem 1.5rem",
            textAlign: "center",
            background: "var(--color-bg)",
          }}
        >
          <motion.div
            {...fw(0)}
            style={{ maxWidth: "38rem", margin: "0 auto" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.75rem,4vw,2.75rem)",
                fontWeight: 800,
                color: "var(--color-text)",
                marginBottom: "1.25rem",
                letterSpacing: "-0.025em",
              }}
            >
              Ready to Build Your Legacy?
            </h2>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "1.125rem",
                marginBottom: "2.5rem",
                lineHeight: 1.75,
              }}
            >
              Let's start with a conversation about your dream pool and how we
              can bring it to life with precision and care.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/contact"
                className="btn btn-primary btn-lg"
                style={{ textDecoration: "none" }}
              >
                Get in Touch{" "}
                <ArrowRight style={{ width: "1.125rem", height: "1.125rem" }} />
              </Link>
              <Link
                to="/projects"
                className="btn btn-secondary btn-lg"
                style={{ textDecoration: "none" }}
              >
                See Our Portfolio
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
