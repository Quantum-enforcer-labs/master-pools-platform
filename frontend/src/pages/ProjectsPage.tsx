import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Droplets,
  Grid,
  List,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { MetaHead } from "../components/seo/MetaHead";
import {
  StructuredData,
  breadcrumbSchema,
} from "../components/seo/StructuredData";
import ProjectCard from "../components/ui/ProjectCard";
import { useProjects } from "../hooks/useApi";

const STATUSES = ["all", "completed", "ongoing", "upcoming"];
const CATEGORIES = [
  "all",
  "residential",
  "commercial",
  "olympic",
  "infinity",
  "indoor",
  "natural",
  "custom",
];
const STATUS_LABELS: Record<string, string> = {
  all: "All Status",
  completed: "Completed",
  ongoing: "In Progress",
  upcoming: "Upcoming",
};
const CAT_LABELS: Record<string, string> = {
  all: "All Types",
  residential: "Residential",
  commercial: "Commercial",
  olympic: "Olympic",
  infinity: "Infinity",
  indoor: "Indoor",
  natural: "Natural",
  custom: "Custom",
};

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("projectId") || params.get("id");

    if (projectId) {
      navigate({
        to: "/projects/$id",
        params: { id: projectId },
        replace: true,
      });
    }
  }, [navigate]);

  const { data, isLoading } = useProjects({
    page,
    limit: 12,
    ...(search && { search }),
    ...(status !== "all" && { status }),
    ...(category !== "all" && { category }),
  });

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setCategory("all");
    setPage(1);
  };
  const hasFilters = search || status !== "all" || category !== "all";

  return (
    <>
      <MetaHead
        title="Pool Projects | MATERPOOLS AND CONTRUCTION — Custom & Commercial"
        description="Browse our portfolio of luxury swimming pools, from residential sanctuaries to Olympic-grade aquatic complexes."
        canonical="https://masterpools.co.zw/projects"
      />
      <StructuredData
        schema={breadcrumbSchema([
          { name: "Home", url: "https://masterpools.co.zw/" },
          { name: "Projects", url: "https://masterpools.co.zw/projects" },
        ])}
      />
      <div
        style={{
          minHeight: "100vh",
          paddingBottom: "5rem",
          background: "var(--color-bg)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid var(--color-border)",
            padding: "4rem 1.5rem 3.5rem",
          }}
        >
          <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                Our Portfolio
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(2.25rem,5vw,3.25rem)",
                  fontWeight: 800,
                  color: "var(--color-text)",
                  marginBottom: "1rem",
                  letterSpacing: "-0.025em",
                }}
              >
                All <span className="gradient-text">Projects</span>
              </h1>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  maxWidth: "38rem",
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                }}
              >
                Explore our complete portfolio — from bespoke residential
                retreats to world-class aquatic centres across Zimbabwe.
              </p>
            </motion.div>
          </div>
        </div>

        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "2.5rem 1.5rem 0",
          }}
        >
          {/* Filters bar */}
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--color-border)",
              borderRadius: "14px",
              padding: "0.875rem 1rem",
              marginBottom: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              alignItems: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative", flex: "1", minWidth: "240px" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "1rem",
                  height: "1rem",
                  color: "var(--color-gray-400)",
                }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by name, feature, location…"
                className="input"
                style={{
                  paddingLeft: "2.5rem",
                  background: "var(--color-gray-50)",
                  borderColor: "var(--color-border)",
                }}
              />
            </div>

            {/* Status */}
            <div style={{ position: "relative" }}>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="select"
                style={{
                  width: "auto",
                  minWidth: "140px",
                  background: "var(--color-gray-50)",
                  paddingRight: "2rem",
                }}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div style={{ position: "relative" }}>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="select"
                style={{
                  width: "auto",
                  minWidth: "140px",
                  background: "var(--color-gray-50)",
                  paddingRight: "2rem",
                }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {CAT_LABELS[c]}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear filters */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "8px",
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#DC2626",
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                <X style={{ width: "0.875rem", height: "0.875rem" }} /> Clear
              </button>
            )}

            {/* View toggle */}
            <div
              style={{
                display: "flex",
                gap: "0.125rem",
                marginLeft: "auto",
                background: "var(--color-gray-100)",
                padding: "0.25rem",
                borderRadius: "8px",
              }}
            >
              {[
                { v: "grid", I: Grid },
                { v: "list", I: List },
              ].map(({ v, I }) => (
                <button
                  key={v}
                  onClick={() => setView(v as any)}
                  style={{
                    padding: "0.375rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    border: "none",
                    transition: "all 0.15s ease",
                    background: view === v ? "#fff" : "transparent",
                    color:
                      view === v
                        ? "var(--color-primary-900)"
                        : "var(--color-gray-400)",
                    boxShadow:
                      view === v ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  <I style={{ width: "1rem", height: "1rem" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {data && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                Showing{" "}
                <span style={{ color: "var(--color-text)", fontWeight: 700 }}>
                  {data.projects.length}
                </span>{" "}
                of{" "}
                <span style={{ color: "var(--color-text)", fontWeight: 700 }}>
                  {data.pagination.total}
                </span>{" "}
                projects
                {hasFilters && (
                  <span
                    style={{
                      marginLeft: "0.5rem",
                      color: "var(--color-primary-600)",
                    }}
                  >
                    · filters applied
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Projects grid */}
          {isLoading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  view === "list"
                    ? "1fr"
                    : "repeat(auto-fill, minmax(300px,1fr))",
                gap: "1.5rem",
              }}
            >
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ height: view === "list" ? "6rem" : "20rem" }}
                />
              ))}
            </div>
          ) : !data?.projects?.length ? (
            <div
              className="card"
              style={{ textAlign: "center", padding: "6rem 1.5rem" }}
            >
              <div
                style={{
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "50%",
                  background: "var(--color-gray-100)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}
              >
                <Search
                  style={{
                    width: "2rem",
                    height: "2rem",
                    color: "var(--color-gray-300)",
                  }}
                />
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "var(--color-text)",
                  marginBottom: "0.5rem",
                }}
              >
                No projects found
              </h3>
              <p
                style={{
                  color: "var(--color-text-tertiary)",
                  marginBottom: "2rem",
                  maxWidth: "24rem",
                  margin: "0 auto 2rem",
                }}
              >
                We couldn't find any projects matching your current filters. Try
                broadening your search.
              </p>
              <button onClick={clearFilters} className="btn btn-primary btn-md">
                Clear All Filters
              </button>
            </div>
          ) : view === "list" ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {data.projects.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to="/projects/$id"
                    params={{ id: project.slug || project._id }}
                    style={{
                      display: "flex",
                      gap: "1.25rem",
                      background: "#fff",
                      border: "1px solid var(--color-border)",
                      borderRadius: "12px",
                      padding: "1rem",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      alignItems: "center",
                      boxShadow: "var(--shadow-xs)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--color-primary-200)";
                      e.currentTarget.style.boxShadow = "var(--shadow-md)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-border)";
                      e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                    }}
                  >
                    <div
                      style={{
                        width: "6rem",
                        height: "4.5rem",
                        borderRadius: "8px",
                        overflow: "hidden",
                        flexShrink: 0,
                        background: "var(--color-gray-100)",
                      }}
                    >
                      {project.coverImage?.thumbnail ||
                      project.coverImage?.url ? (
                        <img
                          src={
                            project.coverImage.thumbnail ||
                            project.coverImage?.url
                          }
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Droplets
                          style={{
                            width: "1.75rem",
                            height: "1.75rem",
                            color: "var(--color-gray-300)",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          marginBottom: "0.375rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          className="badge badge-blue"
                          style={{ textTransform: "capitalize" }}
                        >
                          {project.category}
                        </span>
                        <span
                          className={
                            project.status === "completed"
                              ? "badge badge-green"
                              : project.status === "ongoing"
                                ? "badge badge-blue"
                                : "badge badge-amber"
                          }
                        >
                          {project.status}
                        </span>
                      </div>
                      <p
                        style={{
                          fontWeight: 700,
                          color: "var(--color-text)",
                          margin: "0 0 0.125rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: "1rem",
                        }}
                      >
                        {project.title}
                      </p>
                      <p
                        style={{
                          color: "var(--color-text-secondary)",
                          fontSize: "0.8125rem",
                          margin: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {project.shortDescription || project.description}
                      </p>
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        flexShrink: 0,
                        paddingRight: "0.5rem",
                      }}
                    >
                      {project.location && (
                        <p
                          style={{
                            color: "var(--color-text-tertiary)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            justifyContent: "flex-end",
                          }}
                        >
                          <MapPin
                            style={{ width: "0.75rem", height: "0.75rem" }}
                          />{" "}
                          {project.location}
                        </p>
                      )}
                      <span
                        style={{
                          color: "var(--color-primary-600)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          marginTop: "0.25rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.125rem",
                          justifyContent: "flex-end",
                        }}
                      >
                        View{" "}
                        <ChevronRight
                          style={{ width: "0.75rem", height: "0.75rem" }}
                        />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
                gap: "1.5rem",
              }}
            >
              {data.projects.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {data && data.pagination.pages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.375rem",
                marginTop: "4rem",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn btn-secondary btn-sm"
                style={{ opacity: page === 1 ? 0.4 : 1 }}
              >
                Previous
              </button>
              {Array.from({ length: data.pagination.pages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid",
                    background:
                      page === i + 1 ? "var(--color-primary-900)" : "#fff",
                    borderColor:
                      page === i + 1
                        ? "var(--color-primary-900)"
                        : "var(--color-border)",
                    color: page === i + 1 ? "#fff" : "var(--color-gray-600)",
                    boxShadow:
                      page === i + 1 ? "0 2px 8px rgba(30,58,138,0.2)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setPage((p) => Math.min(data.pagination.pages, p + 1))
                }
                disabled={page === data.pagination.pages}
                className="btn btn-secondary btn-sm"
                style={{ opacity: page === data.pagination.pages ? 0.4 : 1 }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
