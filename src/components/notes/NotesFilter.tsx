"use client";

import { FiSearch, FiX } from "react-icons/fi";

interface NotesFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  seasonTopics: string[];
}

export const NotesFilter = ({
  searchQuery,
  onSearchChange,
  selectedTopic,
  onTopicChange,
  seasonTopics,
}: NotesFilterProps) => {
  return (
    <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between border-y border-border/80 py-4">
      <div className="relative w-full md:w-80 shrink-0">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 text-primary">
          <FiSearch size={17} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search notes, episodes, or topics..."
          className="
            w-full rounded-2xl border border-border bg-surface/70
            py-2.5 pl-10.5 pr-10 text-sm text-text placeholder:text-text-muted/70
            backdrop-blur-md shadow-xs transition-all duration-200
            focus:border-primary/80 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20
            hover:border-border/90
          "
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-surface-hover text-text-muted hover:bg-hover hover:text-text transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <FiX size={12} />
          </button>
        )}
      </div>

      <div className="relative min-w-0 flex-1">
        <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto py-0.5">
          {seasonTopics.map(topic => (
            <button
              key={topic}
              type="button"
              onClick={() => onTopicChange(topic)}
              className={`
                shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer
                ${
                  selectedTopic === topic
                    ? "bg-primary text-black shadow-md shadow-primary/20"
                    : "border border-border/80 bg-surface/50 text-text-muted hover:border-border hover:bg-surface hover:text-text"
                }
              `}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
