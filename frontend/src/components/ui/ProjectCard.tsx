import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Droplets,
  Eye,
  Layers,
  MapPin,
  Star,
} from "lucide-react";
import type { Project } from "../../types";
import { cn } from "../../utils/cn";

const STATUS_MAP = {
  completed: { label: "Completed", cls: "badge badge-green" },
  ongoing: { label: "In Progress", cls: "badge badge-blue" },
  upcoming: { label: "Upcoming", cls: "badge badge-amber" },
};

const CAT_MAP: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  olympic: "Olympic",
  infinity: "Infinity",
  indoor: "Indoor",
  natural: "Natural",
  custom: "Custom",
};

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const coverUrl =
    project.coverImage?.thumbnail || project.coverImage?.url || "";
  const status = STATUS_MAP[project.status] || STATUS_MAP.ongoing;
  const galleryCount = project.gallery?.length ?? 0;

  return (
    <Link
      to="/projects/$id"
      params={{ id: project.slug || project._id }}
      style={{ textDecoration: "none" }}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "group relative rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer h-full flex flex-col",
          featured
            ? "bg-linear-to-br from-primary-50 to-white border-primary-200 shadow-sm hover:shadow-md"
            : "bg-white border-gray-200 shadow-card hover:border-primary-200 hover:shadow-card-hover",
        )}
      >
        {/* Image area */}
        <div className="relative h-52 bg-gray-100 overflow-hidden shrink-0">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={project.coverImage?.alt || project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <Droplets className="w-10 h-10 text-gray-300" />
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={status.cls}>{status.label}</span>
            {project.isFeatured && (
              <span className="badge badge-amber flex items-center gap-1">
                <Star className="w-3 h-3" /> Featured
              </span>
            )}
          </div>

          {/* Gallery count */}
          {galleryCount > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-700 text-white bg-black/40 backdrop-blur-sm rounded-md px-1.5 py-0.5 border border-white/20">
              <Layers className="w-3 h-3" /> {galleryCount + 1}
            </div>
          )}

          {/* Arrow on hover */}
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-primary-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-700 uppercase tracking-wider text-primary-600">
              {CAT_MAP[project.category] || project.category}
            </span>
          </div>
          <h3 className="font-sans font-700 text-gray-900 text-[1.0625rem] leading-snug mb-2 line-clamp-1 group-hover:text-primary-900 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
            {project.shortDescription || project.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-3">
              {project.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-gray-300" />{" "}
                  {project.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-gray-300" /> {project.views}
              </span>
            </div>
            {project.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-300" /> {project.duration}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
