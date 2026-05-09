import { AnimatePresence, motion } from "framer-motion";
import {
  Droplets,
  Edit2,
  Eye,
  EyeOff,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  useAdminProjects,
  useCreateProject,
  useDeleteProject,
  useTogglePublish,
  useUpdateProject,
  useUploadMultiple,
  useUploadSingle,
} from "../../hooks/useApi";

import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { Project } from "../../types";
import { cn } from "../../utils/cn";

const CATEGORIES = [
  "residential",
  "commercial",
  "olympic",
  "infinity",
  "indoor",
  "natural",
  "custom",
];
const STATUSES = ["completed", "ongoing", "upcoming"];

const EMPTY: Partial<Project> = {
  title: "",
  description: "",
  shortDescription: "",
  category: "residential",
  status: "completed",
  location: "",
  client: "",
  duration: "",
  area: "",
  depth: "",
  isFeatured: false,
  isPublished: false,
  features: [],
  tags: [],
};

export default function AdminProjects() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState<
    { url: string; fileId: string; thumbnail: string }[]
  >([]);
  const [uploading, setUploading] = useState(false);
  const [featuresInput, setFeaturesInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const { data, refetch } = useAdminProjects({
    page,
    limit: 15,
    ...(search && { search }),
  });
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const togglePublish = useTogglePublish();
  const uploadSingle = useUploadSingle();
  const uploadMulti = useUploadMultiple();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: EMPTY });

  const openCreate = () => {
    setEditing(null);
    reset(EMPTY);
    setCoverPreview("");
    setGalleryPreviews([]);
    setFeaturesInput("");
    setTagsInput("");
    setModalOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    reset({ ...p });
    setCoverPreview(p.coverImage?.url || "");
    setGalleryPreviews(
      p.gallery?.map((g) => ({
        url: g.url,
        fileId: g.fileId || "",
        thumbnail: g.thumbnail || g.url,
      })) || [],
    );
    setFeaturesInput(p.features?.join(", ") || "");
    setTagsInput(p.tags?.join(", ") || "");
    setModalOpen(true);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    fd.append("folder", "masterpools/projects/covers");
    uploadSingle.mutate(fd, {
      onSuccess: (data: any) => {
        setValue("coverImage", {
          url: data.url,
          fileId: data.fileId,
          thumbnail: data.thumbnail,
          alt: "",
        });
        setCoverPreview(data.url);
        setUploading(false);
      },
      onError: () => {
        toast.error("Cover upload failed");
        setUploading(false);
      },
    });
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("images", f));
    fd.append("folder", "masterpools/projects/gallery");
    uploadMulti.mutate(fd, {
      onSuccess: (data: any) => {
        const newImgs = data.images;
        setGalleryPreviews((prev) => [...prev, ...newImgs]);
        setValue("gallery", [...galleryPreviews, ...newImgs] as any);
        setUploading(false);
      },
      onError: () => {
        toast.error("Gallery upload failed");
        setUploading(false);
      },
    });
  };

  const removeGalleryImage = (idx: number) => {
    const updated = galleryPreviews.filter((_, i) => i !== idx);
    setGalleryPreviews(updated);
    setValue("gallery", updated as any);
  };

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      features: featuresInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      tags: tagsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      gallery: galleryPreviews,
    };
    if (editing) {
      updateProject.mutate(
        { id: editing._id, data: payload },
        {
          onSuccess: () => {
            toast.success("Project updated");
            setModalOpen(false);
            refetch();
          },
          onError: (err: any) =>
            toast.error(err.response?.data?.message || "Update failed"),
        },
      );
    } else {
      createProject.mutate(payload, {
        onSuccess: () => {
          toast.success("Project created");
          setModalOpen(false);
          refetch();
        },
        onError: (err: any) =>
          toast.error(err.response?.data?.message || "Create failed"),
      });
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    deleteProject.mutate(id, {
      onSuccess: () => {
        toast.success("Project deleted");
        refetch();
      },
      onError: () => toast.error("Delete failed"),
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Projects
          </h1>
          <p
            style={{
              color: "var(--color-text-tertiary)",
              fontSize: "0.875rem",
              marginTop: "0.25rem",
              fontWeight: 500,
            }}
          >
            {data?.pagination.total ?? 0} total showcase projects
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search projects…"
              className="input"
              style={{ width: "14rem", paddingLeft: "2.25rem" }}
            />
          </div>
          <button onClick={openCreate} className="btn btn-primary btn-md">
            <Plus style={{ width: "1rem", height: "1rem" }} /> New Project
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead
              style={{
                background: "var(--color-gray-50)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <tr>
                {[
                  "Project",
                  "Category",
                  "Status",
                  "Views",
                  "Published",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="table-head">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!data?.projects?.length ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      textAlign: "center",
                      padding: "5rem",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    No projects found.
                  </td>
                </tr>
              ) : (
                data.projects.map((p, idx) => (
                  <motion.tr
                    key={p._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="table-row"
                  >
                    <td className="table-cell">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            width: "3rem",
                            height: "2.25rem",
                            borderRadius: "6px",
                            background: "var(--color-gray-100)",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          {p.coverImage?.thumbnail ? (
                            <img
                              src={p.coverImage.thumbnail}
                              alt={p.title || "Project cover image"}
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
                                width: "1.25rem",
                                height: "1.25rem",
                                color: "var(--color-gray-300)",
                                margin: "0 auto",
                              }}
                            />
                          )}
                        </div>
                        <div>
                          <p
                            style={{
                              fontWeight: 700,
                              color: "var(--color-text)",
                              fontSize: "0.875rem",
                              margin: 0,
                            }}
                          >
                            {p.title}
                          </p>
                          <p
                            style={{
                              color: "var(--color-text-tertiary)",
                              fontSize: "0.75rem",
                              margin: 0,
                            }}
                          >
                            {format(new Date(p.createdAt), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="badge badge-blue capitalize">
                        {p.category}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span
                        className={cn(
                          "badge capitalize",
                          p.status === "completed"
                            ? "badge-green"
                            : p.status === "ongoing"
                              ? "badge-blue"
                              : "badge-amber",
                        )}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td
                      className="table-cell"
                      style={{
                        color: "var(--color-text-secondary)",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                      }}
                    >
                      {p.views.toLocaleString()}
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={() =>
                          togglePublish.mutate(p._id, {
                            onSuccess: (r) =>
                              toast.success(
                                r.isPublished ? "Published" : "Unpublished",
                              ),
                          })
                        }
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          cursor: "pointer",
                        }}
                      >
                        <span
                          className={cn(
                            "badge",
                            p.isPublished ? "badge-green" : "badge-gray",
                          )}
                          style={{ cursor: "pointer" }}
                        >
                          {p.isPublished ? (
                            <>
                              <Eye
                                style={{ width: "0.75rem", height: "0.75rem" }}
                              />{" "}
                              Live
                            </>
                          ) : (
                            <>
                              <EyeOff
                                style={{ width: "0.75rem", height: "0.75rem" }}
                              />{" "}
                              Draft
                            </>
                          )}
                        </span>
                      </button>
                    </td>
                    <td className="table-cell">
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => openEdit(p)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "0.4375rem" }}
                          title="Edit"
                        >
                          <Edit2
                            style={{ width: "0.875rem", height: "0.875rem" }}
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id, p.title)}
                          className="btn btn-danger btn-sm"
                          style={{ padding: "0.4375rem" }}
                          title="Delete"
                        >
                          <Trash2
                            style={{ width: "0.875rem", height: "0.875rem" }}
                          />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {data?.pagination.pages && data.pagination.pages > 1 && (
        <div
          style={{ display: "flex", justifyContent: "center", gap: "0.375rem" }}
        >
          {[...Array(data.pagination.pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "6px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                border: "1px solid",
                borderColor:
                  page === i + 1
                    ? "var(--color-primary-900)"
                    : "var(--color-border)",
                background:
                  page === i + 1 ? "var(--color-primary-900)" : "#fff",
                color: page === i + 1 ? "#fff" : "var(--color-text-secondary)",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "2rem 1rem",
              overflowY: "auto",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(4px)",
              }}
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="card"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "40rem",
                padding: "2rem",
                zIndex: 10,
                boxShadow: "var(--shadow-xl)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--color-text)",
                    margin: 0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {editing ? "Edit Project" : "New Project Showcase"}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "8px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--color-gray-400)",
                  }}
                >
                  <X style={{ width: "1.25rem", height: "1.25rem" }} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div>
                  <label className="label">
                    Project Title{" "}
                    <span style={{ color: "var(--color-danger)" }}>*</span>
                  </label>
                  <input
                    {...register("title", { required: true })}
                    className="input"
                    placeholder="e.g. The Azure Estate Infinity Pool"
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.25rem",
                  }}
                >
                  <div>
                    <label className="label">
                      Category{" "}
                      <span style={{ color: "var(--color-danger)" }}>*</span>
                    </label>
                    <select
                      {...register("category", { required: true })}
                      className="select"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c} className="capitalize">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">
                      Status{" "}
                      <span style={{ color: "var(--color-danger)" }}>*</span>
                    </label>
                    <select
                      {...register("status", { required: true })}
                      className="select"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="capitalize">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">Short Description</label>
                  <input
                    {...register("shortDescription")}
                    className="input"
                    maxLength={200}
                    placeholder="Brief highlight for cards (max 200 chars)"
                  />
                </div>

                <div>
                  <label className="label">
                    Full Description{" "}
                    <span style={{ color: "var(--color-danger)" }}>*</span>
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    rows={4}
                    className="textarea"
                    placeholder="Detailed project case study, challenges and outcomes..."
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label className="label">Location</label>
                    <input
                      {...register("location")}
                      className="input"
                      placeholder="Harare"
                    />
                  </div>
                  <div>
                    <label className="label">Client</label>
                    <input
                      {...register("client")}
                      className="input"
                      placeholder="Private Residence"
                    />
                  </div>
                  <div>
                    <label className="label">Duration</label>
                    <input
                      {...register("duration")}
                      className="input"
                      placeholder="4 months"
                    />
                  </div>
                  <div>
                    <label className="label">Pool Area</label>
                    <input
                      {...register("area")}
                      className="input"
                      placeholder="60m²"
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label className="label">
                      Features{" "}
                      <span
                        style={{
                          color: "var(--color-text-tertiary)",
                          fontWeight: 400,
                        }}
                      >
                        (comma-separated)
                      </span>
                    </label>
                    <input
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      className="input"
                      placeholder="Heating, LEDs, Spa..."
                    />
                  </div>
                  <div>
                    <label className="label">
                      Tags{" "}
                      <span
                        style={{
                          color: "var(--color-text-tertiary)",
                          fontWeight: 400,
                        }}
                      >
                        (comma-separated)
                      </span>
                    </label>
                    <input
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="input"
                      placeholder="luxury, residential..."
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.25rem",
                  }}
                >
                  {/* Cover */}
                  <div>
                    <label className="label">Main Cover Image</label>
                    <div
                      style={{
                        border: "2px dashed var(--color-border)",
                        borderRadius: "12px",
                        padding: "1rem",
                        textAlign: "center",
                        background: "var(--color-gray-50)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {coverPreview ? (
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100px",
                            borderRadius: "8px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={coverPreview}
                            alt="Project cover preview"
                            loading="lazy"
                            decoding="async"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setCoverPreview("");
                              setValue("coverImage", undefined);
                            }}
                            style={{
                              position: "absolute",
                              top: "0.375rem",
                              right: "0.375rem",
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "50%",
                              background: "rgba(0,0,0,0.5)",
                              color: "#fff",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <X
                              style={{ width: "0.875rem", height: "0.875rem" }}
                            />
                          </button>
                        </div>
                      ) : (
                        <label
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "1rem 0",
                          }}
                        >
                          <Upload
                            style={{
                              width: "1.5rem",
                              height: "1.5rem",
                              color: "var(--color-gray-300)",
                            }}
                          />
                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--color-text-tertiary)",
                              fontWeight: 600,
                            }}
                          >
                            Click to upload
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverUpload}
                            style={{ display: "none" }}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Gallery */}
                  <div>
                    <label className="label">Gallery Images</label>
                    <div
                      style={{
                        border: "2px dashed var(--color-border)",
                        borderRadius: "12px",
                        padding: "1rem",
                        background: "var(--color-gray-50)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                        }}
                      >
                        {galleryPreviews.map((img, i) => (
                          <div
                            key={i}
                            style={{
                              position: "relative",
                              width: "2.5rem",
                              height: "2.5rem",
                              borderRadius: "6px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={img.thumbnail || img.url}
                              alt={`Gallery image`}
                              loading="lazy"
                              decoding="async"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(i)}
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                width: "0.875rem",
                                height: "0.875rem",
                                background: "rgba(239,68,68,0.8)",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <X
                                style={{ width: "0.5rem", height: "0.5rem" }}
                              />
                            </button>
                          </div>
                        ))}
                        <label
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "6px",
                            border: "1px dashed var(--color-border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            background: "#fff",
                          }}
                        >
                          <Plus
                            style={{
                              width: "1rem",
                              height: "1rem",
                              color: "var(--color-gray-400)",
                            }}
                          />
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryUpload}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1.5rem" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      {...register("isFeatured")}
                      style={{
                        width: "1rem",
                        height: "1rem",
                        cursor: "pointer",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Featured project
                    </span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      {...register("isPublished")}
                      style={{
                        width: "1rem",
                        height: "1rem",
                        cursor: "pointer",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Publish immediately
                    </span>
                  </label>
                </div>

                {uploading && (
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-primary-600)",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    Uploading assets...
                  </p>
                )}

                <div
                  style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
                >
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn btn-secondary btn-lg"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      createProject.isPending ||
                      updateProject.isPending ||
                      uploading
                    }
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1 }}
                  >
                    {createProject.isPending || updateProject.isPending
                      ? "Saving..."
                      : editing
                        ? "Update Project"
                        : "Create Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
