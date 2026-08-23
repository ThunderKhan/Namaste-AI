"use client";

import { FaGithub } from "react-icons/fa";
import { RiMoonClearLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import iconImg from "@/app/icon.png";
import { LuSun } from "react-icons/lu";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-body/80 backdrop-blur-xl">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="group flex items-center gap-2 font-bold tracking-tight">
          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 2,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
          >
            <Image
              src={iconImg}
              alt="Namaste AI logo"
              width={40}
              height={40}
              priority
              className="
                h-10 w-10
                rounded-lg
                shadow-lg shadow-amber-500/25
                transition-shadow duration-300
                group-hover:shadow-amber-500/40
              "
            />
          </motion.div>

          <span
            className="
              bg-linear-to-r
              from-primary
              via-secondary
              to-highlight
              bg-clip-text
              text-2xl
              font-bold
              tracking-wide
              text-transparent
              drop-shadow-sm
              font-(family-name:--font-audiowide)
            "
          >
            Namaste AI
          </span>
        </Link>

        <Navbar />

        <div
          className="
            flex items-center
            rounded-2xl
            border border-border
            bg-surface/60
            p-1
            backdrop-blur-md
            shadow-lg shadow-black/5
          "
        >
          <motion.button
            type="button"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="
              inline-flex h-9 w-9
              cursor-pointer
              items-center justify-center
              rounded-xl
              text-text-muted
              transition-colors duration-200
              hover:bg-hover
              hover:text-primary
            "
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <LuSun size={18} /> : <RiMoonClearLine size={18} />}
          </motion.button>

          <div className="mx-1 h-5 w-px bg-border" />

          <motion.a
            href="https://github.com/chetannada/Namaste-AI"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="
              group
              inline-flex
              items-center
              gap-1.5
              rounded-xl
              px-3
              py-1.5
              text-text-muted
              transition-colors duration-200
              hover:bg-hover
              hover:text-primary
            "
            aria-label="GitHub Repository"
          >
            <FaGithub
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:rotate-12
              "
            />
            <span className="hidden text-sm font-medium sm:inline">GitHub</span>
          </motion.a>
        </div>
      </div>
    </header>
  );
}
