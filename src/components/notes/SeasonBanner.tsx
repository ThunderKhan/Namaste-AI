"use client";

import { Season } from "@/data/notesData";

interface SeasonBannerProps {
  season: Season;
  episodesCount: number;
}

export const SeasonBanner = ({ season, episodesCount }: SeasonBannerProps) => {
  return (
    <div className="mt-8 rounded-3xl border border-border bg-linear-to-r from-surface via-surface/80 to-surface/40 p-6 sm:p-8 shadow-xl shadow-black/5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
            Season {season.seasonNumber}
          </span>
          <span className="rounded-xl bg-surface-hover px-3 py-1 text-xs font-semibold text-text-muted">
            {season.tag}
          </span>
        </div>

        <span className="text-xs font-medium text-text-muted">
          {episodesCount} {episodesCount === 1 ? "Episode" : "Episodes"} Available
        </span>
      </div>

      <h2 className="mt-3 text-xl sm:text-2xl font-bold text-text">{season.title}</h2>
      <p className="mt-1 text-sm font-medium text-primary">{season.subtitle}</p>
      <p className="mt-2 max-w-3xl text-xs sm:text-sm leading-relaxed text-text-muted">
        {season.description}
      </p>
    </div>
  );
};
