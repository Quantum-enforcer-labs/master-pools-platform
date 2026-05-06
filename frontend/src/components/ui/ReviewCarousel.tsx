import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type Review = {
  _id: string;
  title?: string;
  content: string;
  rating: number;
  user?: { name: string; role?: string; avatar?: string };
};

type Props = {
  reviews: Review[];
  autoplayDelay?: number;
  className?: string;
};

export default function ReviewCarousel({
  reviews,
  autoplayDelay = 3500,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const count = reviews ? reviews.length : 0;

  useEffect(() => {
    if (!count) return;
    const id = setInterval(() => {
      if (!isPaused) setIndex((i) => (i + 1) % count);
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplayDelay, isPaused, count]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function prev() {
    setIndex((i) => (i - 1 + count) % count);
  }
  function next() {
    setIndex((i) => (i + 1) % count);
  }

  if (!reviews || reviews.length === 0) return null;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`w-full ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative" style={{ minHeight: 220 }}>
          {reviews.map((r, i) => {
            const visible = i === index;
            return (
              <article
                key={r._id}
                aria-hidden={!visible}
                className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${
                  visible
                    ? "opacity-100 translate-x-0 z-10"
                    : "opacity-0 translate-x-4 z-0"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <img
                      src={r.user?.avatar || "/images/avatar-placeholder.svg"}
                      alt={r.user?.name || "User avatar"}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {r.user?.name}
                          </p>
                          {r.user?.role && (
                            <p className="text-xs text-slate-500 mt-0.5">
                              {r.user.role}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`w-4 h-4 ${j < r.rating ? "text-amber-400" : "text-slate-200"}`}
                            />
                          ))}
                        </div>
                      </div>

                      <h4 className="mt-4 text-base font-semibold text-slate-900">
                        {r.title}
                      </h4>
                      <p className="mt-2 text-sm text-slate-600 leading-7">
                        {r.content}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Controls */}
          <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-2 -translate-y-1/2">
            <button
              aria-label="Previous testimonial"
              onClick={prev}
              className="p-2 rounded-lg bg-white shadow hover:scale-105 transition-transform"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="p-2 rounded-lg bg-white shadow hover:scale-105 transition-transform"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === index ? "bg-slate-800 scale-110" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
