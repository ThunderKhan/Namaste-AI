import { IoMdHeart } from "react-icons/io";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-body">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-text-muted sm:text-sm">
            <span>Built with</span>
            <IoMdHeart className="text-orange-500 animate-pulse" size={14} />
            <span>by</span>
            <a
              href="https://www.linkedin.com/in/chetannada"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-text transition-colors duration-300 hover:text-primary"
            >
              Chetan Nada
            </a>
            <span className="text-text-muted">·</span>
            <span>© {year} Namaste AI</span>
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/chetannada"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10"
              aria-label="GitHub"
            >
              <FaGithub size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/chetannada"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href="https://x.com/chetannada"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10"
              aria-label="X (Twitter)"
            >
              <FaXTwitter size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

