import { authorProfile } from "~/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-[#E2E8F0] py-10 mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] sm:text-xs text-slate-500 tracking-normal">
        <div className="flex items-center gap-2">
          <span>{authorProfile.name}</span>
          <span className="text-slate-300">·</span>
          <span className="text-cobalt">{authorProfile.handle}</span>
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <a
            href={authorProfile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cobalt transition-colors duration-200"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href={authorProfile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cobalt transition-colors duration-200"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href={authorProfile.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cobalt transition-colors duration-200"
          >
            X ({authorProfile.handle})
          </a>
          <span>·</span>
          <a
            href={authorProfile.socials.email}
            className="hover:text-cobalt transition-colors duration-200"
          >
            Email
          </a>
        </div>
        <div>
          © {currentYear}
        </div>
      </div>
    </footer>
  );
}
