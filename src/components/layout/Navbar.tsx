"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiBookOpen } from "react-icons/fi";

const navItems = [
  { label: "Home", href: "/", icon: FiHome },
  { label: "Notes", href: "/notes", icon: FiBookOpen },
];

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Main navigation"
      className="absolute left-1/2 hidden -translate-x-1/2 lg:flex items-center gap-8"
    >
      {navItems.map(item => {
        const active = isActive(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              group relative inline-flex items-center gap-1.5 py-2 text-base font-medium transition-colors duration-200
              ${active ? "text-primary" : "text-text-muted hover:text-text"}
            `}
          >
            <Icon size={16} />
            {item.label}

            <span
              className={`
                absolute bottom-0 left-0 h-0.5 bg-primary
                transition-all duration-300 ease-out
                ${active ? "w-full" : "w-0 group-hover:w-full"}
              `}
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
