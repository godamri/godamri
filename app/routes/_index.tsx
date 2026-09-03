import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  authorProfile,
  selectedWork,
  domains,
  toolset,
} from "~/data/portfolio";

export const meta: MetaFunction = () => {
  return [
    { title: `${authorProfile.name} — ${authorProfile.role}` },
    {
      name: "description",
      content: `${authorProfile.name} — ${authorProfile.subheadline}`,
    },
    { property: "og:title", content: `${authorProfile.name} — ${authorProfile.role}` },
    { property: "og:description", content: authorProfile.subheadline },
    { property: "og:type", content: "website" },
  ];
};

export default function IndexPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-20 sm:pb-28 border-b border-[#E2E8F0]">
        <div className="max-w-4xl pt-4 sm:pt-8 pb-8 sm:pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#BFDBFE]/60 bg-[#EFF6FF] text-[11px] font-mono uppercase tracking-[0.2em] text-cobalt mb-8 sm:mb-10 font-medium">
            {authorProfile.role}
          </div>
          <h1 className="font-sans font-semibold text-[44px] sm:text-[68px] lg:text-[76px] leading-[1.04] tracking-[-0.035em] text-ink max-w-3xl">
            {authorProfile.headline}
          </h1>
          <p className="font-sans text-lg sm:text-xl text-ink-muted leading-relaxed mt-8 sm:mt-10 max-w-xl font-normal">
            {authorProfile.subheadline}
          </p>
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
            <a
              href="#work"
              className="inline-flex items-center justify-center bg-ink text-white text-[13px] font-medium px-6 py-3.5 rounded-full hover:bg-cobalt transition-colors duration-200 tracking-tight shadow-sm hover:shadow-blue-500/10"
            >
              View selected work →
            </a>
            <Link
              to="/thoughts"
              className="inline-flex items-center justify-center bg-white border border-slate-200 text-ink text-[13px] font-medium px-6 py-3.5 rounded-full hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200 tracking-tight"
            >
              Read thoughts & essays ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="py-20 sm:py-24 border-b border-[#E2E8F0]" id="work">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 sm:mb-12">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] font-normal">
            <span className="text-cobalt font-medium">01 /</span>
            <span className="text-ink-muted">SELECTED WORK</span>
          </div>
          <span className="hidden sm:inline font-mono text-xs text-cobalt tracking-wider px-2 py-0.5 rounded bg-[#EFF6FF] border border-[#DBEAFE]">
            0{selectedWork.length} ENTRIES
          </span>
        </div>

        <div className="divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0]">
          {selectedWork.map((project) => (
            <a
              key={project.id}
              href={project.link || "#"}
              className="group relative block py-9 sm:py-10 transition-colors duration-200 hover:bg-[#F1F5F9]/60 -mx-4 px-4 sm:-mx-6 sm:px-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline">
                <div className="md:col-span-4 flex items-baseline gap-4">
                  <span className="font-mono text-xs text-cobalt/70 group-hover:text-cobalt font-medium transition-colors duration-200">
                    {project.num}
                  </span>
                  <h3 className="font-sans text-2xl sm:text-[28px] font-medium tracking-tight text-ink group-hover:text-cobalt group-hover:translate-x-1 transition-all duration-200">
                    {project.title}
                  </h3>
                </div>
                <div className="md:col-span-5">
                  <p className="font-sans text-[15px] sm:text-base text-ink-muted group-hover:text-ink transition-colors duration-200">
                    {project.description}
                  </p>
                  <div className="mt-2 font-mono text-xs text-ink-light tracking-normal">
                    {project.stack}
                  </div>
                </div>
                <div className="md:col-span-2 font-mono text-xs text-ink-light md:text-right">
                  {project.period}
                </div>
                <div className="md:col-span-1 text-right font-mono text-base text-slate-400 group-hover:text-cobalt transition-all duration-200 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Where I Work / Domains Section */}
      <section className="py-20 sm:py-24 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] font-normal mb-10 sm:mb-12">
          <span className="text-cobalt font-medium">02 /</span>
          <span className="text-ink-muted">WHERE I WORK</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          {domains.map((domain) => (
            <div
              key={domain.num}
              className="md:col-span-6 lg:col-span-4 pt-4 border-t border-[#E2E8F0] flex flex-col justify-between group"
            >
              <div>
                <div className="font-mono text-xs text-cobalt tracking-wider mb-2.5 font-medium">
                  {domain.num}
                </div>
                <h3 className="font-sans text-lg font-medium text-ink tracking-tight group-hover:text-cobalt transition-colors duration-200">
                  {domain.title}
                </h3>
                <p className="font-sans text-sm text-ink-muted mt-2 leading-relaxed">
                  {domain.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 sm:py-24 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] font-normal mb-10 sm:mb-12">
          <span className="text-cobalt font-medium">03 /</span>
          <span className="text-ink-muted">TOOLS I WORK WITH</span>
        </div>
        <div className="divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0]">
          {toolset.map((item) => (
            <div
              key={item.category}
              className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-baseline"
            >
              <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-slate-500">
                {item.category}
              </div>
              <div className="md:col-span-8 font-sans text-sm sm:text-[15px] font-medium text-ink tracking-tight">
                {item.skills}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 sm:py-28 border-b border-[#E2E8F0]" id="about">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] font-normal mb-10 sm:mb-12">
          <span className="text-cobalt font-medium">04 /</span>
          <span className="text-ink-muted">ABOUT</span>
        </div>
        <div className="max-w-3xl">
          <h3 className="font-sans font-medium text-2xl sm:text-[34px] leading-[1.25] tracking-tight text-ink mb-10 sm:mb-12">
            {authorProfile.aboutQuote}
          </h3>
          <div className="space-y-6 font-sans text-base sm:text-lg text-ink-muted leading-relaxed font-normal">
            {authorProfile.aboutParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 sm:py-28" id="contact">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] font-normal mb-10 sm:mb-12">
          <span className="text-cobalt font-medium">05 /</span>
          <span className="text-ink-muted">CONTACT</span>
        </div>
        <div className="max-w-2xl">
          <h2 className="font-sans font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-ink leading-tight">
            Let's build something useful.
          </h2>
          <p className="font-sans text-base sm:text-lg text-ink-muted mt-5 leading-relaxed font-normal">
            For engineering roles, architecture work, projects, or just a good technical conversation.
          </p>
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-8 sm:gap-12 pt-6 border-t border-[#E2E8F0]">
            <a
              href={authorProfile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-sans text-base font-medium text-ink hover:text-cobalt transition-colors duration-200 inline-flex items-center gap-1.5 py-1"
            >
              <span className="border-b border-transparent group-hover:border-cobalt transition-colors duration-200">
                LinkedIn
              </span>
              <span className="font-mono text-xs text-cobalt transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <a
              href={authorProfile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-sans text-base font-medium text-ink hover:text-cobalt transition-colors duration-200 inline-flex items-center gap-1.5 py-1"
            >
              <span className="border-b border-transparent group-hover:border-cobalt transition-colors duration-200">
                GitHub
              </span>
              <span className="font-mono text-xs text-cobalt transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <a
              href={authorProfile.socials.email}
              className="group font-sans text-base font-medium text-ink hover:text-cobalt transition-colors duration-200 inline-flex items-center gap-1.5 py-1"
            >
              <span className="border-b border-transparent group-hover:border-cobalt transition-colors duration-200">
                Email
              </span>
              <span className="font-mono text-xs text-cobalt transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
