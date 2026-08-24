"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Episode, Season } from "@/data/notesData";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiZoomOut,
  FiRotateCcw,
  FiMaximize2,
  FiDownload,
  FiBookOpen,
} from "react-icons/fi";

interface NotesViewerModalProps {
  episode: Episode | null;
  season: Season | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectEpisode: (episode: Episode) => void;
}

export const NotesViewerModal = ({
  episode,
  season,
  isOpen,
  onClose,
  onSelectEpisode,
}: NotesViewerModalProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPageIndex(0);
    setZoomLevel(1);
  }, [episode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalPages = episode?.pages.length || 0;
  const currentPage = episode?.pages[currentPageIndex];

  const handlePrevPage = useCallback(() => {
    setCurrentPageIndex(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPageIndex(prev => (prev < totalPages - 1 ? prev + 1 : prev));
  }, [totalPages]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrevPage, handleNextPage]);

  const currentEpisodeIndex = season?.episodes.findIndex(ep => ep.id === episode?.id) ?? -1;
  const prevEpisode = currentEpisodeIndex > 0 ? season?.episodes[currentEpisodeIndex - 1] : null;
  const nextEpisode =
    currentEpisodeIndex >= 0 && season && currentEpisodeIndex < season.episodes.length - 1
      ? season.episodes[currentEpisodeIndex + 1]
      : null;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && episode && (
        <div className="fixed inset-0 z-200 flex flex-col items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            aria-hidden="true"
          />

          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-210 flex h-16 sm:h-20 w-full shrink-0 items-center justify-between border-b border-border/80 bg-body/80 px-4 sm:px-8 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
                Season {season?.seasonNumber} · EP {episode.episodeNumber}
              </span>

              <div>
                <h2 className="text-sm sm:text-base font-bold text-text line-clamp-1">
                  {episode.title}
                </h2>
                <p className="hidden text-xs text-text-muted sm:block">
                  {currentPage?.title || `Page ${currentPageIndex + 1}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-1.5 rounded-xl border border-border bg-surface/70 px-3 py-1.5 text-xs font-mono font-medium text-text-muted backdrop-blur-md">
                <FiBookOpen size={13} className="text-primary" />
                <span>{currentPageIndex + 1}</span>
                <span className="text-border">/</span>
                <span>{totalPages}</span>
              </span>

              <div className="hidden items-center rounded-xl border border-border bg-surface/70 p-0.5 backdrop-blur-md md:flex">
                <button
                  type="button"
                  onClick={() => setZoomLevel(z => Math.max(0.75, z - 0.25))}
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted hover:bg-hover hover:text-primary transition-colors"
                  title="Zoom Out"
                >
                  <FiZoomOut size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted hover:bg-hover hover:text-primary transition-colors"
                  title="Reset Zoom"
                >
                  <FiRotateCcw size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(z => Math.min(2.5, z + 0.25))}
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted hover:bg-hover hover:text-primary transition-colors"
                  title="Zoom In"
                >
                  <FiZoomIn size={15} />
                </button>
              </div>

              {currentPage?.imageUrl && (
                <a
                  href={currentPage.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-7 w-7 sm:h-9 sm:w-9 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl border border-border bg-surface/70 text-text-muted hover:bg-hover hover:text-primary transition-colors"
                  title="Open Original Image in New Tab"
                >
                  <FiMaximize2 className="size-3.5 sm:size-4" />
                </a>
              )}

              {currentPage?.imageUrl && (
                <a
                  href={currentPage.imageUrl}
                  download={`Namaste-AI-S${season?.seasonNumber}-EP${episode.episodeNumber}-Page${currentPageIndex + 1}.webp`}
                  className="inline-flex h-7 w-7 sm:h-9 sm:w-9 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl border border-border bg-surface/70 text-text-muted hover:bg-hover hover:text-primary transition-colors"
                  title="Download Note Page"
                >
                  <FiDownload className="size-3.5 sm:size-4" />
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 sm:h-9 sm:w-9 cursor-pointer items-center justify-center rounded-xl border border-highlight/40 bg-highlight/10 text-highlight hover:bg-highlight hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-highlight/25 backdrop-blur-md transition-all duration-200"
                aria-label="Close notes viewer"
                title="Close notes viewer"
              >
                <FiX className="size-4 sm:size-4.5" />
              </button>
            </div>
          </motion.header>

          <div className="relative z-210 flex h-[calc(100dvh-130px)] sm:h-[calc(100dvh-160px)] w-full items-center justify-center p-3 sm:p-6 overflow-hidden">
            {totalPages > 1 && (
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className={`
                  absolute left-2 sm:left-6 z-220 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-border bg-body/80 text-text-muted backdrop-blur-md transition-all duration-200
                  ${
                    currentPageIndex === 0
                      ? "opacity-30 cursor-not-allowed"
                      : "cursor-pointer hover:border-primary/50 hover:bg-surface hover:text-primary hover:scale-105 shadow-xl shadow-black/30"
                  }
                `}
                aria-label="Previous note page"
              >
                <FiChevronLeft className="size-5 sm:size-7" />
              </button>
            )}

            <motion.div
              key={`${episode.id}-page-${currentPageIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: zoomLevel }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex max-h-full max-w-5xl items-center justify-center overflow-auto rounded-2xl border border-border bg-surface/40 shadow-2xl shadow-black/60 backdrop-blur-xs"
            >
              {currentPage?.imageUrl ? (
                <div className="relative max-h-[72vh] w-auto">
                  <Image
                    src={currentPage.imageUrl}
                    alt={currentPage.title || `Handwritten notes page ${currentPageIndex + 1}`}
                    width={1200}
                    height={900}
                    priority
                    className="max-h-[72vh] w-auto object-contain rounded-2xl"
                  />
                </div>
              ) : (
                <div className="flex h-96 w-96 flex-col items-center justify-center gap-3 text-text-muted">
                  <FiBookOpen size={40} className="text-primary/60" />
                  <p className="text-sm font-medium">No note page uploaded yet</p>
                </div>
              )}
            </motion.div>

            {totalPages > 1 && (
              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPageIndex === totalPages - 1}
                className={`
                  absolute right-2 sm:right-6 z-220 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-border bg-body/80 text-text-muted backdrop-blur-md transition-all duration-200
                  ${
                    currentPageIndex === totalPages - 1
                      ? "opacity-30 cursor-not-allowed"
                      : "cursor-pointer hover:border-primary/50 hover:bg-surface hover:text-primary hover:scale-105 shadow-xl shadow-black/30"
                  }
                `}
                aria-label="Next note page"
              >
                <FiChevronRight className="size-5 sm:size-7" />
              </button>
            )}
          </div>

          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative z-210 flex h-20 w-full shrink-0 items-center justify-between border-t border-border/80 bg-body/90 px-4 sm:px-8 backdrop-blur-md"
          >
            {prevEpisode && prevEpisode.isAvailable ? (
              <button
                type="button"
                onClick={() => onSelectEpisode(prevEpisode)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface/70 px-3 py-1.5 text-xs font-semibold text-text-muted hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
              >
                <FiChevronLeft size={14} />
                EP {prevEpisode.episodeNumber}
              </button>
            ) : (
              <div className="w-20" />
            )}

            <div className="no-scrollbar flex items-center justify-center gap-2 overflow-x-auto px-2 py-0.5">
              {episode.pages.map((page, idx) => (
                <button
                  key={page.pageNumber}
                  type="button"
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`
                    relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer
                    ${
                      currentPageIndex === idx
                        ? "border-primary ring-2 ring-primary/40 scale-105 shadow-lg shadow-primary/20"
                        : "border-border/80 opacity-60 hover:opacity-100"
                    }
                  `}
                >
                  <Image
                    src={page.imageUrl}
                    alt={`Thumbnail page ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-0.5 right-1 rounded-sm bg-black/75 px-1 text-[9px] font-mono font-bold text-white">
                    P{idx + 1}
                  </span>
                </button>
              ))}
            </div>

            {nextEpisode && nextEpisode.isAvailable ? (
              <button
                type="button"
                onClick={() => onSelectEpisode(nextEpisode)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface/70 px-3 py-1.5 text-xs font-semibold text-text-muted hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
              >
                EP {nextEpisode.episodeNumber}
                <FiChevronRight size={14} />
              </button>
            ) : (
              <div className="w-20" />
            )}
          </motion.footer>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
