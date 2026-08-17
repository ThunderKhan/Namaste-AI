"use client";

import { FaGithub } from "react-icons/fa";
import { RiMoonClearLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import iconImg from "@/app/icon.png";
import { LuSun } from "react-icons/lu";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-body/80 backdrop-blur-xl">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 sm:px-8">
        <Link href="/" className="group flex items-center gap-2 font-bold text-2xl tracking-tight">
          <Image
            src={iconImg}
            alt="Namaste AI logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow duration-300"
          />
          <span className="bg-linear-to-r from-primary via-secondary to-highlight bg-clip-text text-transparent italic tracking-wide drop-shadow-sm">
            Namaste AI
          </span>
        </Link>

        <nav className="flex items-center rounded-2xl border border-border bg-surface/60 backdrop-blur-md p-1.5 gap-1 shadow-lg shadow-black/5">
          <button
            type="button"
            onClick={toggleTheme}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-text-muted transition-all duration-300 hover:bg-hover hover:text-primary cursor-pointer"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <LuSun size={18} className="transition-transform duration-300 hover:scale-110" />
            ) : (
              <RiMoonClearLine
                size={18}
                className="transition-transform duration-300 hover:scale-110"
              />
            )}
          </button>

          <div className="w-px h-5 bg-border" />

          <a
            href="https://github.com/chetannada/Namaste-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-text-muted transition-all duration-300 hover:bg-hover hover:text-primary"
            aria-label="GitHub Repository"
          >
            <FaGithub
              size={17}
              className="group-hover:rotate-360 transition-transform duration-300"
            />
            <span className="hidden sm:inline text-sm font-medium">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
