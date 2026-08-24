"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { LuSun } from "react-icons/lu";
import { RiMoonClearLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import iconImg from "@/app/icon.jpg";
import { navItems } from "./Navbar";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.06, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  return (
    <>
      <div
        className="
          flex items-center
          rounded-xl sm:rounded-2xl
          border border-border
          bg-surface/60
          p-0.5 sm:p-1
          backdrop-blur-md
          shadow-lg shadow-black/5
          lg:hidden
        "
      >
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="
            inline-flex h-8 w-8 sm:h-9 sm:w-9
            cursor-pointer items-center justify-center
            rounded-lg sm:rounded-xl
            text-text-muted
            transition-colors duration-200
            hover:bg-hover hover:text-primary
          "
          aria-label="Open navigation menu"
        >
          <HiOutlineMenuAlt3 className="size-4.5 sm:size-5" />
        </motion.button>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  key="sidebar-backdrop"
                  variants={backdropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 z-100 bg-black/75 lg:hidden cursor-default"
                  aria-label="Close sidebar overlay"
                />

                <motion.aside
                  key="sidebar-panel"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="
                    fixed top-0 right-0 bottom-0 z-101
                    flex h-dvh w-72 sm:w-80 flex-col
                    border-l border-border
                    bg-body shadow-2xl shadow-black/40
                    lg:hidden
                  "
                >
                  <div className="relative flex h-16 sm:h-20 shrink-0 items-center justify-between border-b border-border px-4 sm:px-5">
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center font-bold tracking-tight"
                    >
                      <Image
                        src={iconImg}
                        alt="Namaste AI logo"
                        width={36}
                        height={36}
                        className="
                          h-8 w-8 sm:h-10 sm:w-10 rounded-lg
                          shadow-md sm:shadow-lg shadow-amber-500/25
                          transition-transform duration-300
                          group-hover:scale-105
                        "
                      />
                    </Link>

                    <motion.button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.92 }}
                      className="
                        inline-flex h-8 w-8 sm:h-9 sm:w-9 cursor-pointer
                        items-center justify-center
                        rounded-lg sm:rounded-xl border border-border
                        bg-surface/60 text-text-muted
                        backdrop-blur-md
                        transition-colors duration-200
                        hover:bg-hover hover:text-primary
                      "
                      aria-label="Close navigation menu"
                    >
                      <FiX className="size-4 sm:size-5" />
                    </motion.button>
                  </div>

                  <div className="flex flex-col gap-1.5 overflow-y-auto px-4 py-5">
                    <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation">
                      {navItems.map((item, i) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;

                        return (
                          <motion.div
                            key={item.href}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={`
                                group flex items-center gap-3
                                rounded-xl px-4 py-3
                                text-base font-medium
                                transition-all duration-200
                                ${
                                  active
                                    ? "bg-primary/10 text-primary shadow-sm shadow-primary/5"
                                    : "text-text-muted hover:bg-hover hover:text-text"
                                }
                              `}
                            >
                              <Icon
                                size={18}
                                className={`transition-colors duration-200 ${
                                  active
                                    ? "text-primary"
                                    : "text-text-muted group-hover:text-primary"
                                }`}
                              />
                              {item.label}

                              {active && (
                                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                              )}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </nav>

                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={navItems.length}
                      className="mt-3 pt-3 border-t border-border"
                    >
                      <div
                        className="
                          flex items-center justify-between
                          rounded-2xl border border-border
                          bg-surface/60 p-1
                          backdrop-blur-md
                          shadow-lg shadow-black/5
                        "
                      >
                        <motion.button
                          type="button"
                          onClick={toggleTheme}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          className="
                            flex flex-1 items-center justify-center gap-2
                            rounded-xl py-2 px-3
                            text-xs font-medium text-text-muted
                            transition-colors duration-200
                            hover:bg-hover hover:text-primary cursor-pointer
                          "
                          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                        >
                          {theme === "dark" ? <LuSun size={16} /> : <RiMoonClearLine size={16} />}
                          <span>{theme === "dark" ? "Light" : "Dark"}</span>
                        </motion.button>

                        <div className="mx-1 h-5 w-px bg-border" />

                        <motion.a
                          href="https://github.com/chetannada/Namaste-AI"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          className="
                            group flex flex-1 items-center justify-center gap-2
                            rounded-xl py-2 px-3
                            text-xs font-medium text-text-muted
                            transition-colors duration-200
                            hover:bg-hover hover:text-primary
                          "
                          aria-label="GitHub Repository"
                        >
                          <FaGithub
                            size={16}
                            className="transition-transform duration-300 group-hover:rotate-360"
                          />
                          <span>GitHub</span>
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Sidebar;
