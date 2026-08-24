"use client";

import { FiTv, FiLayers, FiEdit3, FiShare2 } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

export const NotesHero = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="group relative inline-flex rounded-full p-px shadow-lg shadow-primary/5">
        <span className="absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
          <span
            className="absolute inset-[-200%] animate-border-beam"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, transparent 70%, var(--primary) 80%, var(--accent) 90%, transparent 100%)",
            }}
          />
        </span>
        <span
          className="
            relative z-10 inline-flex items-center gap-2
            rounded-full bg-body px-4 py-1.5
            text-xs sm:text-sm font-medium text-primary
          "
          style={{ boxShadow: "inset 0 0 12px var(--glow)" }}
        >
          <HiOutlineSparkles className="text-accent" size={16} />
          AI Learning Notes
        </span>
      </span>

      <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        Season-Wise{" "}
        <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Handwritten Notes
        </span>
      </h1>

      <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-text-muted">
        Explore visual collection of handwritten notes, key concepts, diagrams, and learning
        takeaways from{" "}
        <a
          href="https://namastedev.com/learn/namaste-ai?_aff=946684804112"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent no-underline transition-all duration-300 hover:underline hover:decoration-accent/60 hover:underline-offset-2"
        >
          Namaste AI
        </a>{" "}
        course by Akshay Saini ·{" "}
        <a
          href="https://namastedev.com?_aff=946684804112"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-highlight no-underline transition-all duration-300 hover:underline hover:decoration-highlight/60 hover:underline-offset-2"
        >
          NamasteDev
        </a>
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-text-muted">
        <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface/70 px-3 py-1.5 backdrop-blur-md">
          <FiTv className="text-primary" size={13} />
          <span>5 Seasons</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface/70 px-3 py-1.5 backdrop-blur-md">
          <FiLayers className="text-secondary" size={13} />
          <span>25+ Episodes</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface/70 px-3 py-1.5 backdrop-blur-md">
          <FiEdit3 className="text-accent" size={13} />
          <span>Visual Notes</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface/70 px-3 py-1.5 backdrop-blur-md">
          <FiShare2 className="text-highlight" size={13} />
          <span>Learning in Public</span>
        </span>
      </div>
    </div>
  );
};
