import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  CheckCircle,
  ChevronDown,
  Clock,
  DollarSign,
  Droplets,
  Globe,
  Home,
  Infinity as InfinityIcon,
  Leaf,
  Phone,
  Play,
  Shield,
  Snowflake,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useFeaturedProjects,
  useProjectStats,
  useVideos,
} from "../hooks/useApi";

import { Link } from "@tanstack/react-router";
import { MetaHead } from "../components/seo/MetaHead";
import {
  StructuredData,
  organizationSchema,
} from "../components/seo/StructuredData";
import ProjectCard from "../components/ui/ProjectCard";
import ReviewCarousel from "../components/ui/ReviewCarousel";
import VideoCarousel from "../components/ui/VideoCarousel";

const POOL_CATEGORIES = [
  {
    key: "residential",
    icon: Home,
    label: "Residential",
    desc: "Exquisite private sanctuaries engineered for luxury living and timeless elegance.",
  },
  {
    key: "commercial",
    icon: Building2,
    label: "Commercial",
    desc: "World-class aquatic destinations for premium hospitality and elite institutions.",
  },
  {
    key: "infinity",
    icon: InfinityIcon,
    label: "Infinity",
    desc: "Architectural masterpieces that blur the line between water and horizon.",
  },
  {
    key: "olympic",
    icon: Droplets,
    label: "Olympic",
    desc: "Championship-grade aquatic complexes meeting international competition standards.",
  },
  {
    key: "indoor",
    icon: Snowflake,
    label: "Indoor",
    desc: "State-of-the-art climate-controlled aquatic suites for year-round excellence.",
  },
  {
    key: "natural",
    icon: Leaf,
    label: "Natural",
    desc: "Bio-engineered ecosystems combining sustainability with aquatic perfection.",
  },
];

const TRUST_LOGOS = [
  "Harare",
  "Borrowdale",
  "Bulawayo",
  "Avondale",
  "Mutare",
  "Mount Pleasant",
  "Waterfalls",
  "Chitungwiza",
  "Belgravia",
  "Gweru",
  "Milton Park",
  "Kwekwe",
  "Khumalo",
  "Sakubva",
];

const SERVICES = [
  {
    icon: Zap,
    title: "Equipment & Filtration Systems",
    desc: "State-of-the-art pumps, filters, and automation for optimal water quality and energy efficiency.",
  },
  {
    icon: Droplets,
    title: "New Pool Construction",
    desc: "From foundations to finishing, we deliver premium residential and commercial pool builds.",
  },
  {
    icon: Shield,
    title: "Renovations & Upgrades",
    desc: "Modernise aging pools with resurfacing, waterproofing, energy upgrades, and modern finishes.",
  },
  {
    icon: Clock,
    title: "Maintenance & Support",
    desc: "Keep your pool performing with ongoing care, inspections, and responsive after-sales support.",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Consultation",
    desc: "Complimentary site visit. We assess the space and discuss possibilities.",
  },
  {
    n: "02",
    title: "Quotation",
    desc: "Detailed, transparent breakdown — no hidden costs, ever.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Master craftsmen on-site daily. Weekly progress updates.",
  },
  {
    n: "04",
    title: "Handover",
    desc: "Full training, warranty certificate, and dedicated after-care.",
  },
];

const HARDCODED_REVIEWS = [
  {
    _id: "1",
    title: "Exceeded All Expectations",
    content:
      "MATERPOOLS AND CONTRUCTION transformed our backyard into a luxury oasis. The attention to detail, professionalism, and timeline adherence were impeccable. Highly recommend!",
    rating: 5,
    user: { name: "Sarah Mwangi" },
    project: { title: "Residential Infinity Pool - Harare" },
  },
  {
    _id: "2",
    title: "Professional & Reliable",
    content:
      "From the initial consultation to the final handover, the team was professional, transparent, and responsive. Our Olympic-grade pool is exceptional.",
    rating: 5,
    user: { name: "David Chen" },
    project: { title: "Commercial Olympic Complex - Bulawayo" },
  },
  {
    _id: "3",
    title: "Fantastic Renovation Work",
    content:
      "We were skeptical about upgrading our old pool, but MATERPOOLS AND CONTRUCTION restored it beautifully. The new filtration system works perfectly.",
    rating: 5,
    user: { name: "Jennifer Ndlela" },
    project: { title: "Pool Renovation - Mount Pleasant" },
  },
  {
    _id: "4",
    title: "Outstanding Quality & Service",
    content:
      "Best investment we've made for our home. The craftsmanship is world-class and the support team is always available when needed.",
    rating: 5,
    user: { name: "Marcus Thompson" },
    project: { title: "Custom Residential Pool - Borrowdale" },
  },
  {
    _id: "5",
    title: "Professional Excellence",
    content:
      "MATERPOOLS AND CONTRUCTION delivered on every promise. The design consultation was thorough, the build was flawless, and we couldn't be happier with the result.",
    rating: 5,
    user: { name: "Amanda Konde" },
    project: { title: "Indoor Climate Pool - Avondale" },
  },
  {
    _id: "6",
    title: "Truly Exceptional Work",
    content:
      "From concept to completion, every step was handled with precision and care. Our pool is the envy of the neighborhood!",
    rating: 5,
    user: { name: "Peter Mudzamba" },
    project: { title: "Natural Bio-Pool - Waterfalls" },
  },
  {
    _id: "7",
    title: "Seamless Project Delivery",
    content:
      "The team managed timelines, subcontractors, and site complexities masterfully. Communication was excellent throughout.",
    rating: 5,
    user: { name: "Linda Chiwenga" },
    project: { title: "Infinity Edge Pool - Borrowdale" },
  },
  {
    _id: "8",
    title: "Luxury Finish, Outstanding Value",
    content:
      "Attention to materials and finishing touches made our pool stand out. Great value for the quality delivered.",
    rating: 5,
    user: { name: "Thomas Banda" },
    project: { title: "Custom Residential Pool - Highlands" },
  },
];

const WHY_US = [
  {
    icon: Award,
    title: `${new Date().getFullYear() - 2014}+ Years of Excellence`,
    desc: "Unrivalled expertise crafting 150+ transformative aquatic experiences across Zimbabwe.",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Lifetime Assurance",
    desc: "Comprehensive 10-year warranty backed by our unwavering commitment to excellence.",
    color: "indigo",
  },
  {
    icon: Droplets,
    title: "World-Class Materials",
    desc: "Premium imported Italian tiles, German engineering, and UV-resilient finishes.",
    color: "blue",
  },
  {
    icon: Clock,
    title: "Flawless Execution",
    desc: "Precision delivery guaranteed — delays incur penalty compensation to you.",
    color: "green",
  },
  {
    icon: Globe,
    title: "Sustainable Luxury",
    desc: "Eco-engineered solutions: solar heating, adaptive pumps, and water recirculation.",
    color: "green",
  },
  {
    icon: Users,
    title: "Expert Master Craftsmen",
    desc: "Highly skilled teams with decades of combined aquatic construction experience.",
    color: "blue",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    desc: "Clear, itemised quotations with zero hidden costs or surprise charges.",
    color: "indigo",
  },
  {
    icon: Zap,
    title: "Rapid Turnaround",
    desc: "Efficient project timelines without compromising quality or craftsmanship.",
    color: "green",
  },
];

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now();
    const duration = 1800;
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any },
});

export default function HomePage() {
  const yearsExp = new Date().getFullYear() - 2014;
  const { data: featured, isLoading } = useFeaturedProjects();
  const { data: stats } = useProjectStats();
  const { data: videosData = [] } = useVideos(true);
  const reviews = HARDCODED_REVIEWS;
  const completedProjects = Math.max(stats?.completed ?? 150, 150);
  const [activeCategory, setActiveCategory] = useState("residential");
  const [videoOpen, setVideoOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const activeCat = POOL_CATEGORIES.find((c) => c.key === activeCategory)!;

  const colorCardMap: Record<
    string,
    { bg: string; border: string; icon: string }
  > = {
    blue: {
      bg: "var(--color-primary-50)",
      border: "var(--color-primary-100)",
      icon: "var(--color-primary-700)",
    },
    indigo: {
      bg: "var(--color-secondary-50)",
      border: "var(--color-secondary-100)",
      icon: "var(--color-secondary-600)",
    },
    green: {
      bg: "var(--color-accent-50)",
      border: "var(--color-accent-100)",
      icon: "var(--color-accent-600)",
    },
  };

  return (
    <>
      <MetaHead
        title="MATERPOOLS AND CONTRUCTION | Luxury Swimming Pools — Zimbabwe"
        description="Zimbabwe's most trusted luxury swimming pool construction company. Custom design, expert construction, lifetime support."
        ogImage="https://www.masterspools.co.zw/og-image.png"
        ogType="website"
        canonical="https://www.masterspools.co.zw/"
      />
      <StructuredData schema={organizationSchema} />
      <div style={{ overflowX: "hidden" }}>
        {/* ══ HERO ════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="hero-home"
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Hero background */}
          <motion.div
            style={{
              y: heroY,
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, #172554 0%, #1E3A8A 35%, #1D4ED8 65%, #4338CA 100%)",
            }}
          />

          {/* Overlay mesh */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />

          {/* Animated orbs */}
          {[
            { size: 600, x: "5%", y: "10%", color: "rgba(99,102,241,0.15)" },
            { size: 400, x: "75%", y: "55%", color: "rgba(16,185,129,0.1)" },
            { size: 300, x: "50%", y: "75%", color: "rgba(255,255,255,0.04)" },
          ].map((orb, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: orb.size,
                height: orb.size,
                left: orb.x,
                top: orb.y,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
                pointerEvents: "none",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 8 + i * 2,
                repeat: globalThis.Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          ))}

          {/* Hero content */}
          <motion.div
            style={{
              opacity: heroOpacity,
              position: "relative",
              zIndex: 10,
              maxWidth: "56rem",
              margin: "0 auto",
              padding: "0 1.5rem",
            }}
          >
            <motion.h1
              {...fadeUp(0.15)}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: "clamp(2.25rem, 6vw, 4.25rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
                color: "#fff",
                marginBottom: "1.5rem",
              }}
            >
              Craft Your{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #93C5FD 0%, #C7D2FE 50%, #A5F3FC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Perfect Oasis
              </span>
              <br />
              <span style={{ color: "rgba(255,255,255,0.45)" }}>
                Where Vision Becomes Reality
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.25)}
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                maxWidth: "38rem",
                margin: "0 auto 2.5rem",
                lineHeight: 1.7,
              }}
            >
              MATERPOOLS AND CONTRUCTION delivers world-class aquatic
              experiences. From bespoke residential sanctuaries to
              championship-grade commercial complexes, we engineer perfection.
            </motion.p>

            <motion.div
              {...fadeUp(0.35)}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "4rem",
              }}
            >
              <Link
                to="/quotation"
                className="btn-amber-lg"
                style={{ boxShadow: "0 8px 24px rgba(245,158,11,0.4)" }}
              >
                Get Free Quotation{" "}
                <ArrowRight style={{ width: "1.125rem", height: "1.125rem" }} />
              </Link>
              <button
                onClick={() => setVideoOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.875rem 1.75rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
                }
              >
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Play
                    style={{
                      width: "0.875rem",
                      height: "0.875rem",
                      fill: "#fff",
                      color: "#fff",
                      marginLeft: "0.0625rem",
                    }}
                  />
                </div>
                Watch Our Work
              </button>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              {...fadeUp(0.45)}
              style={{
                display: "grid",
                gap: "0",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "16px",
                overflow: "hidden",
                maxWidth: "44rem",
                margin: "0 auto",
              }}
              className="grid-mobile-1-4"
            >
              {[
                {
                  value: completedProjects,
                  suffix: "+",
                  label: "Pools Completed",
                },
                {
                  value: stats?.ongoing ?? 12,
                  suffix: "",
                  label: "Active Projects",
                },
                { value: yearsExp, suffix: "+", label: "Years Experience" },
                { value: 98, suffix: "%", label: "Client Satisfaction" },
              ].map(({ value, suffix, label }, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1.25rem 1rem",
                    textAlign: "center",
                    borderRight:
                      i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 800,
                      fontSize: "1.75rem",
                      color: "#fff",
                      margin: 0,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    <Counter target={value} suffix={suffix} />
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "0.6875rem",
                      marginTop: "0.25rem",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: globalThis.Infinity }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.625rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </p>
            <ChevronDown
              style={{
                width: "1rem",
                height: "1rem",
                color: "rgba(255,255,255,0.3)",
              }}
            />
          </motion.div>
        </section>

        {/* ══ TRUST MARQUEE ═══════════════════════════════════════════════ */}
        <section
          style={{
            padding: "2.5rem 0",
            borderTop: "1px solid var(--color-border)",
            borderBottom: "1px solid var(--color-border)",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              marginBottom: "1.25rem",
            }}
          >
            Trusted Across Zimbabwe's Premier Locations
          </p>
          <div className="marquee-track">
            {[...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3rem",
                  padding: "0 2.5rem",
                }}
              >
                <span
                  style={{
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {logo}
                </span>
                <div
                  style={{
                    width: "1px",
                    height: "1.25rem",
                    background: "var(--color-border)",
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ══ SERVICES ════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--color-bg)" }}>
          <div className="container-xl">
            <motion.div
              {...fadeUp()}
              style={{ textAlign: "center", marginBottom: "3.5rem" }}
            >
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                Our Services
              </p>
              <h2 className="heading-lg">
                Everything You Need to{" "}
                <span className="gradient-text">Build</span>
              </h2>
              <p
                style={{
                  maxWidth: "42rem",
                  margin: "1rem auto 0",
                  color: "var(--color-text-secondary)",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                We handle the full pool journey end-to-end, from the first site
                visit and concept sketches through construction, upgrades, and
                long-term care.
              </p>
            </motion.div>

            <div
              style={{
                display: "grid",
                gap: "1.25rem",
                maxWidth: "1100px",
                margin: "0 auto",
                justifyItems: "center",
              }}
              className="grid-mobile-1-3"
            >
              {SERVICES.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp(i * 0.08)}
                  className="card-hover"
                  style={{
                    padding: "1.5rem",
                    background: "#fff",
                    border: "1px solid var(--color-border)",
                    borderRadius: "18px",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.25rem",
                      background:
                        "linear-gradient(135deg, var(--color-primary-50), var(--color-secondary-50))",
                      border: "1px solid var(--color-primary-100)",
                    }}
                  >
                    <Icon
                      style={{
                        width: "1.25rem",
                        height: "1.25rem",
                        color: "var(--color-primary-800)",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.925rem",
                      lineHeight: 1.7,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {desc}
                  </p>
                  <Link
                    to="/quotation"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      color: "var(--color-primary-800)",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Request a quote
                    <ArrowUpRight
                      style={{ width: "0.875rem", height: "0.875rem" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ POOL CATEGORIES ══════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--color-bg)" }}>
          <div className="container-xl">
            <motion.div
              {...fadeUp()}
              style={{ textAlign: "center", marginBottom: "3.5rem" }}
            >
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                What We Build
              </p>
              <h2 className="heading-lg">
                Excellence in Every{" "}
                <span className="gradient-text">Detail</span>
              </h2>
            </motion.div>

            {/* Category pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "2.5rem",
              }}
            >
              {POOL_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1.125rem",
                    borderRadius: "999px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    transition: "all 0.15s ease",
                    cursor: "pointer",
                    border: "1px solid",
                    background:
                      activeCategory === cat.key
                        ? "var(--color-primary-900)"
                        : "#fff",
                    borderColor:
                      activeCategory === cat.key
                        ? "var(--color-primary-900)"
                        : "var(--color-border)",
                    color:
                      activeCategory === cat.key
                        ? "#fff"
                        : "var(--color-gray-600)",
                    boxShadow:
                      activeCategory === cat.key
                        ? "0 4px 14px rgba(30,58,138,0.25)"
                        : "var(--shadow-xs)",
                  }}
                >
                  {(() => {
                    const Icon = cat.icon;
                    return (
                      <>
                        <Icon style={{ width: "1rem", height: "1rem" }} />{" "}
                        {cat.label}
                      </>
                    );
                  })()}
                </motion.button>
              ))}
            </div>

            {/* Active category card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                style={{
                  padding: "3rem 3.5rem",
                  textAlign: "center",
                  maxWidth: "44rem",
                  margin: "0 auto",
                  background:
                    "linear-gradient(135deg, var(--color-primary-50) 0%, #fff 60%)",
                  border: "1px solid var(--color-primary-100)",
                  borderRadius: "20px",
                  boxShadow: "0 4px 24px rgba(30,58,138,0.08)",
                }}
              >
                <motion.p
                  style={{
                    fontSize: "3.5rem",
                    marginBottom: "1.25rem",
                    lineHeight: 1,
                  }}
                  animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.4 }}
                >
                  {(() => {
                    const Icon = activeCat.icon;
                    return (
                      <Icon
                        style={{
                          width: "3.5rem",
                          height: "3.5rem",
                          color: "var(--color-primary-700)",
                          margin: "0 auto",
                        }}
                      />
                    );
                  })()}
                </motion.p>
                <h3 className="heading-sm" style={{ marginBottom: "0.75rem" }}>
                  {activeCat.label} Pools
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "1.0625rem",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                  }}
                >
                  {activeCat.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    justifyContent: "center",
                    marginBottom: "2rem",
                  }}
                >
                  {[
                    "Custom Design",
                    "Site Visit Included",
                    "3D Renders",
                    "Warranty",
                  ].map((feat) => (
                    <span
                      key={feat}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        fontSize: "0.875rem",
                        color: "var(--color-primary-700)",
                        fontWeight: 500,
                      }}
                    >
                      <CheckCircle
                        style={{
                          width: "0.875rem",
                          height: "0.875rem",
                          color: "var(--color-accent-500)",
                        }}
                      />{" "}
                      {feat}
                    </span>
                  ))}
                </div>
                <Link
                  to="/quotation"
                  className="btn btn-primary btn-lg"
                  style={{
                    display: "inline-flex",
                    gap: "0.5rem",
                    textDecoration: "none",
                  }}
                >
                  Get {activeCat.label} Pool Quote{" "}
                  <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ══ FEATURED PROJECTS ════════════════════════════════════════════ */}
        <section className="section" style={{ background: "#fff" }}>
          <div className="container-xl">
            <motion.div
              {...fadeUp()}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "3rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <div>
                  <p className="eyebrow" style={{ marginBottom: "0.625rem" }}>
                    Portfolio
                  </p>
                  <h2 className="heading-lg">
                    Featured <span className="gradient-text">Projects</span>
                  </h2>
                </div>
                <Link
                  to="/projects"
                  className="btn btn-outline btn-md"
                  style={{
                    display: "inline-flex",
                    gap: "0.375rem",
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                >
                  View All Projects{" "}
                  <ArrowUpRight
                    style={{ width: "0.875rem", height: "0.875rem" }}
                  />
                </Link>
              </div>
            </motion.div>

            {isLoading ? (
              <div
                style={{
                  display: "grid",
                  gap: "1.5rem",
                }}
                className="grid-mobile-1-3"
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className="skeleton"
                    style={{ height: "18rem" }}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "1.5rem",
                }}
                className="grid-mobile-1-3"
              >
                {(featured ?? []).map((project, i) => (
                  <motion.div key={project._id} {...fadeUp(i * 0.07)}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            )}

            {!isLoading && !(featured ?? []).length && (
              <div
                className="card"
                style={{ textAlign: "center", padding: "3rem" }}
              >
                <Droplets
                  style={{
                    width: "3rem",
                    height: "3rem",
                    color: "var(--color-primary-500)",
                    margin: "0 auto 1rem",
                  }}
                />
                <h3
                  style={{
                    fontWeight: 800,
                    color: "var(--color-text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  No featured projects yet
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    maxWidth: "36rem",
                    margin: "0 auto 1rem",
                  }}
                >
                  We regularly update our featured builds. Explore the full
                  portfolio to browse completed projects across residential,
                  commercial, and speciality pools — or request a free quotation
                  to get your project started.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <a
                    href="/projects"
                    className="btn btn-primary btn-md"
                    style={{ textDecoration: "none" }}
                  >
                    View Portfolio
                  </a>
                  <a
                    href="/quotation"
                    className="btn btn-secondary btn-md"
                    style={{ textDecoration: "none" }}
                  >
                    Request Quotation
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ══ WHY MASTERPOOLS ══════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--color-bg)" }}>
          <div className="container-xl">
            <motion.div
              {...fadeUp()}
              style={{ textAlign: "center", marginBottom: "3.5rem" }}
            >
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                Why Choose Us
              </p>
              <h2 className="heading-lg">
                Built on{" "}
                <span className="gradient-text">Trust & Excellence</span>
              </h2>
            </motion.div>

            <div
              style={{
                display: "grid",
                gap: "1.25rem",
              }}
              className="grid-mobile-1-3"
            >
              {WHY_US.map(({ icon: Icon, title, desc, color }, i) => {
                const c = colorCardMap[color] || colorCardMap.blue;
                return (
                  <motion.div
                    key={title}
                    {...fadeUp(i * 0.07)}
                    className="card-hover"
                    style={{ padding: "1.5rem" }}
                  >
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1.25rem",
                        background: c.bg,
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      <Icon
                        style={{
                          width: "1.25rem",
                          height: "1.25rem",
                          color: c.icon,
                        }}
                      />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 700,
                        color: "var(--color-text)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        color: "var(--color-text-secondary)",
                        fontSize: "0.875rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ PROCESS ══════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "#fff" }}>
          <div className="container-lg">
            <motion.div
              {...fadeUp()}
              style={{ textAlign: "center", marginBottom: "4rem" }}
            >
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                Our Process
              </p>
              <h2 className="heading-lg">
                From <span className="gradient-text">Vision to Reality</span>
              </h2>
            </motion.div>

            <div
              style={{
                display: "grid",
                gap: "2rem",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                maxWidth: "1000px",
                margin: "0 auto",
              }}
              className="grid-mobile-1-4"
            >
              {/* Connector line */}
              <div
                style={{
                  position: "absolute",
                  top: "2.5rem",
                  left: "5%",
                  right: "5%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, var(--color-primary-100), var(--color-secondary-200), var(--color-primary-100), transparent)",
                  display: "none",
                }}
                className="hidden md:block"
              />

              {PROCESS_STEPS.map(({ n, title, desc }, i) => (
                <motion.div
                  key={n}
                  {...fadeUp(i * 0.1)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{ position: "relative", marginBottom: "1.25rem" }}
                  >
                    <div
                      style={{
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "16px",
                        background: "var(--color-primary-50)",
                        border: "1px solid var(--color-primary-100)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(30,58,138,0.06)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--color-secondary-500)",
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {n}
                      </span>
                      <div
                        style={{
                          width: "1.5rem",
                          height: "2px",
                          background:
                            "linear-gradient(90deg, var(--color-primary-300), var(--color-secondary-400))",
                          borderRadius: "999px",
                        }}
                      />
                    </div>
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      marginBottom: "0.5rem",
                      fontSize: "0.9375rem",
                    }}
                  >
                    {title}
                  </h4>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.8125rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ REVIEWS ═══════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "#fff" }}>
          <div className="container-md">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">
                Testimonials
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Hear From Our Clients
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Real feedback from homeowners and businesses who trusted us to
                build something exceptional.
              </p>
            </motion.div>

            <ReviewCarousel reviews={HARDCODED_REVIEWS} autoplayDelay={3500} />
          </div>
        </section>

        {/* ══ VIDEOS ══════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "#fff" }}>
          <div className="container-md">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <p className="inline-flex items-center rounded-full border border-secondary-200 bg-secondary-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-700">
                Videos
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                See The Work In Motion
              </h2>
            </motion.div>

            {videosData.length > 0 ? (
              <VideoCarousel videos={videosData} />
            ) : (
              <div className="rounded-4xl border border-slate-200 bg-slate-950 p-12 text-center">
                <p className="text-slate-400">
                  Video gallery coming soon. Check back later!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ══ CTA ══════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "#fff" }}>
          <div className="container-md">
            <motion.div
              {...fadeUp()}
              style={{
                padding: "4rem 3rem",
                textAlign: "center",
                overflow: "hidden",
                position: "relative",
                background:
                  "linear-gradient(135deg, var(--color-primary-950) 0%, var(--color-primary-900) 40%, #4338CA 100%)",
                borderRadius: "24px",
                boxShadow: "0 8px 40px rgba(30,58,138,0.25)",
              }}
            >
              {/* Decorative */}
              <div
                style={{
                  position: "absolute",
                  top: "-5rem",
                  right: "-5rem",
                  width: "16rem",
                  height: "16rem",
                  borderRadius: "50%",
                  background: "rgba(99,102,241,0.15)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-4rem",
                  left: "-4rem",
                  width: "12rem",
                  height: "12rem",
                  borderRadius: "50%",
                  background: "rgba(16,185,129,0.1)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <p
                  className="eyebrow"
                  style={{
                    color: "rgba(165,180,252,0.9)",
                    marginBottom: "1rem",
                  }}
                >
                  Start Your Journey
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 800,
                    fontSize: "clamp(1.5rem,4vw,2.25rem)",
                    color: "#fff",
                    letterSpacing: "-0.025em",
                    marginBottom: "1rem",
                    maxWidth: "36rem",
                    margin: "0 auto 1rem",
                  }}
                >
                  Transform Your Space Into A Luxury Oasis
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "1.0625rem",
                    marginBottom: "2rem",
                    maxWidth: "32rem",
                    margin: "0 auto 2rem",
                    lineHeight: 1.7,
                  }}
                >
                  Receive a bespoke quotation within 24 hours. Complimentary
                  site assessment included. Zero commitment.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    marginBottom: "2.5rem",
                  }}
                >
                  {[
                    "Free Site Consultation",
                    "Custom 3D Design",
                    "Transparent Pricing",
                    "10-Year Warranty",
                  ].map((feat) => (
                    <span
                      key={feat}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.65)",
                        fontWeight: 500,
                      }}
                    >
                      <CheckCircle
                        style={{
                          width: "0.875rem",
                          height: "0.875rem",
                          color: "#34D399",
                        }}
                      />{" "}
                      {feat}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/quotation" className="btn-amber-lg">
                    Book Free Consultation{" "}
                    <ArrowRight
                      style={{ width: "1.125rem", height: "1.125rem" }}
                    />
                  </Link>
                  <Link
                    to="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      padding: "0.875rem 1.75rem",
                      fontSize: "1rem",
                      fontWeight: 600,
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "12px",
                      color: "#fff",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Phone style={{ width: "1rem", height: "1rem" }} /> Call Us
                    Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video modal */}
        <AnimatePresence>
          {videoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 50,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
              }}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "100%",
                  maxWidth: "50rem",
                  aspectRatio: "16/9",
                  background: "#fff",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "5rem",
                      height: "5rem",
                      borderRadius: "50%",
                      background: "var(--color-primary-50)",
                      border: "1px solid var(--color-primary-100)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                    }}
                  >
                    <Play
                      style={{
                        width: "2rem",
                        height: "2rem",
                        fill: "var(--color-primary-900)",
                        color: "var(--color-primary-900)",
                        marginLeft: "0.125rem",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontWeight: 700,
                      color: "var(--color-text)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Watch Our Work
                  </h3>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.95rem",
                      maxWidth: "28rem",
                      margin: "0 auto",
                    }}
                  >
                    We're preparing a short visual showcase of our recent
                    projects — high-resolution walkthroughs and construction
                    time-lapses to demonstrate our process and finish quality.
                    In the meantime, view our portfolio or book a consultation
                    to see detailed case studies.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <a
                      href="/projects"
                      className="btn btn-primary btn-md"
                      style={{ textDecoration: "none" }}
                    >
                      Browse Portfolio
                    </a>
                    <a
                      href="/contact"
                      className="btn btn-ghost btn-md"
                      style={{ textDecoration: "none" }}
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
