"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Season } from "@/data/notesData";
import { FiTv, FiClock, FiCheckCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface SeasonTabsProps {
  seasons: Season[];
  selectedSeasonId: string;
  onSelectSeason: (seasonId: string) => void;
}

export const SeasonTabs = ({ seasons, selectedSeasonId, onSelectSeason }: SeasonTabsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 12);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, seasons]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector<HTMLButtonElement>(`[data-season-id="${selectedSeasonId}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [selectedSeasonId]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 220;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="group/tabs relative w-full">
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-0 bottom-0 z-20 flex items-center pr-6 bg-linear-to-r from-body via-body/90 to-transparent"
          >
            <motion.button
              type="button"
              onClick={() => handleScroll("left")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border bg-surface/95 text-primary shadow-lg shadow-black/30 backdrop-blur-md hover:border-primary/50 hover:bg-surface-hover transition-colors"
              aria-label="Scroll seasons left"
            >
              <FiChevronLeft size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={scrollRef}
        className="no-scrollbar flex items-center gap-2 overflow-x-auto py-1 px-1 sm:gap-3 scroll-smooth"
      >
        {seasons.map(season => {
          const isSelected = season.id === selectedSeasonId;
          const isAvailable = season.status === "available";
          const isInProgress = season.status === "in-progress";

          return (
            <button
              key={season.id}
              data-season-id={season.id}
              type="button"
              onClick={() => onSelectSeason(season.id)}
              className={`
                group relative flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all duration-300 sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-2.5
                ${
                  isSelected
                    ? "border-primary/60 bg-surface text-text shadow-md shadow-primary/10"
                    : "border-border/80 bg-surface/50 text-text-muted hover:border-border hover:bg-surface hover:text-text"
                }
              `}
            >
              {isSelected && (
                <motion.div
                  layoutId="active-season-indicator"
                  className="absolute inset-0 -z-10 rounded-xl sm:rounded-2xl bg-linear-to-r from-primary/10 via-secondary/10 to-transparent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div
                className={`
                  flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl transition-colors duration-300
                  ${
                    isSelected
                      ? "bg-primary text-black font-bold"
                      : "bg-surface-hover text-text-muted group-hover:text-primary"
                  }
                `}
              >
                <span className="font-mono text-[11px] sm:text-xs font-bold">
                  S{season.seasonNumber}
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-semibold text-xs sm:text-sm transition-colors ${
                      isSelected ? "text-text" : "text-text-muted group-hover:text-text"
                    }`}
                  >
                    Season {season.seasonNumber}
                  </span>

                  {isAvailable && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold text-emerald-500">
                      <FiCheckCircle size={9} />
                      {season.episodes.length} Eps
                    </span>
                  )}
                  {isInProgress && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold text-amber-500">
                      <FiTv size={9} />
                      In Progress
                    </span>
                  )}
                  {!isAvailable && !isInProgress && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-surface-hover px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold text-text-muted">
                      <FiClock size={9} />
                      Soon
                    </span>
                  )}
                </div>

                <span className="hidden text-[11px] text-text-muted sm:inline line-clamp-1 max-w-40">
                  {season.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {canScrollRight && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-0 bottom-0 z-20 flex items-center pl-6 bg-linear-to-l from-body via-body/90 to-transparent"
          >
            <motion.button
              type="button"
              onClick={() => handleScroll("right")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border bg-surface/95 text-primary shadow-lg shadow-black/30 backdrop-blur-md hover:border-primary/50 hover:bg-surface-hover transition-colors"
              aria-label="Scroll seasons right"
            >
              <FiChevronRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
