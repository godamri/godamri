import { useState } from "react";
import { Link, useLocation } from "react-router";
import { authorProfile } from "~/data/portfolio";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8FAFC]/90 backdrop-blur-md border-b border-[#E2E8F0] transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        <Link
          to="/"
          className="font-sans font-semibold tracking-tight text-lg text-ink hover:text-cobalt transition-colors duration-200"
          onClick={closeMenu}
        >
          {authorProfile.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 sm:gap-10 text-[13px] tracking-[0.14em] uppercase font-medium">
          <Link
            to={isHome ? "#work" : "/#work"}
            className="text-slate-500 hover:text-cobalt transition-colors duration-200"
          >
            WORK
          </Link>
          <Link
            to="/thoughts"
            className={`transition-colors duration-200 ${
              location.pathname.startsWith("/thoughts")
                ? "text-ink font-semibold"
                : "text-slate-500 hover:text-cobalt"
            }`}
          >
            THOUGHTS
          </Link>
          <Link
            to={isHome ? "#about" : "/#about"}
            className="text-slate-500 hover:text-cobalt transition-colors duration-200"
          >
            ABOUT
          </Link>
          <Link
            to={isHome ? "#contact" : "/#contact"}
            className="text-slate-500 hover:text-cobalt transition-colors duration-200"
          >
            CONTACT
          </Link>
          <a
            href={authorProfile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-ink hover:text-cobalt transition-colors duration-200 group"
          >
            <span>LINKEDIN</span>
            <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-cobalt">
              ↗
            </span>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ink hover:text-cobalt focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt rounded"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-[#F8FAFC] px-6 py-5 shadow-lg">
          <nav className="flex flex-col gap-4 text-sm font-medium uppercase tracking-[0.14em]">
            <Link
              to={isHome ? "#work" : "/#work"}
              onClick={closeMenu}
              className="py-2 text-slate-600 hover:text-cobalt"
            >
              WORK
            </Link>
            <Link
              to="/thoughts"
              onClick={closeMenu}
              className={`py-2 ${
                location.pathname.startsWith("/thoughts")
                  ? "text-cobalt font-semibold"
                  : "text-slate-600 hover:text-cobalt"
              }`}
            >
              THOUGHTS
            </Link>
            <Link
              to={isHome ? "#about" : "/#about"}
              onClick={closeMenu}
              className="py-2 text-slate-600 hover:text-cobalt"
            >
              ABOUT
            </Link>
            <Link
              to={isHome ? "#contact" : "/#contact"}
              onClick={closeMenu}
              className="py-2 text-slate-600 hover:text-cobalt"
            >
              CONTACT
            </Link>
            <a
              href={authorProfile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 text-slate-600 hover:text-cobalt inline-flex items-center gap-1"
            >
              LINKEDIN <span className="font-mono text-xs text-cobalt">↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
