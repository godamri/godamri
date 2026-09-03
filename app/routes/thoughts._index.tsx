import { useState } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Link, useLoaderData, useSearchParams } from "react-router";
import { authorProfile } from "~/data/portfolio";
import {
  getAllThoughts,
  getCategories,
  type CategoryInfo,
  type ThoughtMeta,
} from "~/lib/content.server";

export const meta: MetaFunction = () => {
  return [
    { title: `Thoughts & Writing — ${authorProfile.name}` },
    {
      name: "description",
      content:
        "Reflections and technical essays about building software, managing complexity, and scaling distributed systems with quiet efficiency.",
    },
    { property: "og:title", content: `Thoughts & Writing — ${authorProfile.name}` },
    {
      property: "og:description",
      content:
        "Reflections and technical essays about building software, managing complexity, and scaling distributed systems.",
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Godamri" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: authorProfile.handle },
    { name: "twitter:title", content: `Thoughts & Writing — ${authorProfile.name}` },
    {
      name: "twitter:description",
      content:
        "Reflections and technical essays on engineering, architecture, and systems.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const thoughts = getAllThoughts();
  const categories = getCategories();

  return {
    thoughts,
    categories,
  };
}

export default function ThoughtsIndexPage() {
  const { thoughts, categories } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [subscribed, setSubscribed] = useState(false);

  // Filter thoughts based on active category
  const filteredThoughts =
    activeCategory === "all"
      ? thoughts
      : thoughts.filter((t) => t.category === activeCategory);

  const featuredThought = thoughts.find((t) => t.featured) || thoughts[0];

  const handleCategoryChange = (catId: string) => {
    if (catId === "all") {
      searchParams.delete("category");
      setSearchParams(searchParams, { replace: true });
    } else {
      searchParams.set("category", catId);
      setSearchParams(searchParams, { replace: true });
    }
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="max-w-[1150px] mx-auto px-5 lg:px-10">
      <div className="flex flex-col w-full">
        {/* Section: Header / Hero Intro */}
        <section className="w-full pt-10 sm:pt-14 pb-10 sm:pb-12">
          <div className="flex flex-col gap-6 max-w-[850px]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse"></span>
              <p className="font-mono text-xs text-slate-500 uppercase tracking-widest font-medium">
                Writing &amp; Field Notes / Systems
              </p>
            </div>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-ink font-bold tracking-tight leading-[1.1]">
              Thoughts on engineering, systems architecture, and craft.
            </h1>
            <p className="font-sans text-base sm:text-lg text-ink-muted max-w-[68ch] leading-relaxed">
              Reflections and technical essays about building software, managing
              complexity, and scaling distributed systems with quiet efficiency.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-2">
            {categories.map((cat: CategoryInfo) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`font-mono text-xs px-3.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                    isActive
                      ? "bg-ink text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-600 hover:text-ink hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {cat.label} {cat.id === "all" ? `(${cat.count})` : ""}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section: Featured Editorial Highlight */}
        {featuredThought && activeCategory === "all" && (
          <section className="w-full mb-14">
            <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-6 sm:p-10 transition-all hover:border-slate-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 text-xs font-mono">
                      <span className="text-cobalt font-semibold tracking-wide uppercase">
                        {featuredThought.categoryLabel}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">
                        {featuredThought.formattedDate}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">
                        {featuredThought.readingTime}
                      </span>
                    </div>
                    <Link
                      to={`/thoughts/${featuredThought.slug}`}
                      className="group inline-block"
                    >
                      <h2 className="font-sans text-2xl sm:text-3xl text-ink font-bold group-hover:text-cobalt transition-colors mb-4 leading-snug">
                        {featuredThought.title}
                      </h2>
                    </Link>
                    <p className="font-sans text-sm sm:text-base text-ink-muted leading-relaxed max-w-[65ch] mb-6">
                      {featuredThought.excerpt}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                    <Link
                      to={`/thoughts/${featuredThought.slug}`}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink hover:text-cobalt transition-colors group font-semibold"
                    >
                      Read Deep Dive
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </Link>
                    {featuredThought.metric && (
                      <span className="font-mono text-xs text-slate-600 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded">
                        {featuredThought.metric}
                      </span>
                    )}
                  </div>
                </div>

                {/* Architectural Metrics Display (SVG stream topology diagram) */}
                <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 rounded p-6 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-slate-500 uppercase font-medium">
                      Stream Topology
                    </span>
                    <span className="text-xs font-mono text-cobalt font-medium">
                      ACTIVE
                    </span>
                  </div>
                  <div className="w-full my-2">
                    <svg
                      className="w-full h-24 text-slate-900"
                      fill="none"
                      viewBox="0 0 280 80"
                    >
                      <path
                        d="M 10 40 L 70 40"
                        stroke="#94a3b8"
                        strokeDasharray="3 3"
                        strokeWidth="1.5"
                      />
                      <rect
                        fill="#f1f5f9"
                        height="36"
                        rx="3"
                        stroke="#64748b"
                        strokeWidth="1.2"
                        width="48"
                        x="70"
                        y="22"
                      />
                      <text
                        fill="#334155"
                        fontFamily="'JetBrains Mono', monospace"
                        fontSize="9"
                        fontWeight="600"
                        textAnchor="middle"
                        x="94"
                        y="44"
                      >
                        QUEUE
                      </text>
                      <path
                        d="M 118 40 L 168 40"
                        stroke="#0f172a"
                        strokeWidth="1.5"
                      />
                      <rect
                        fill="#0f172a"
                        height="48"
                        rx="3"
                        width="60"
                        x="168"
                        y="16"
                      />
                      <text
                        fill="#ffffff"
                        fontFamily="'JetBrains Mono', monospace"
                        fontSize="9"
                        fontWeight="600"
                        textAnchor="middle"
                        x="198"
                        y="44"
                      >
                        WORKER
                      </text>
                      <path
                        d="M 228 40 L 270 40"
                        stroke="#2563eb"
                        strokeWidth="2"
                      />
                      <circle cx="270" cy="40" fill="#2563eb" r="4" />
                    </svg>
                  </div>
                  <div className="pt-3 flex items-center justify-between font-mono text-xs text-slate-500 border-t border-slate-200">
                    <span>
                      {featuredThought.metricDetail || "Operational Architecture"}
                    </span>
                    <span className="text-cobalt font-semibold">Stable</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section: Main Essay Index */}
        <section className="w-full mb-20">
          <div className="flex items-baseline justify-between mb-6 border-b border-slate-200 pb-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Index / Chronological
            </h3>
            <span className="font-mono text-xs text-slate-400">
              Showing {filteredThoughts.length} essay
              {filteredThoughts.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="flex flex-col divide-y divide-slate-100">
            {filteredThoughts.map((article: ThoughtMeta) => (
              <article
                key={article.slug}
                className="p-5 sm:p-6 rounded bg-transparent hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all duration-150"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline">
                  <div className="md:col-span-2 font-mono text-xs text-slate-400 flex items-center gap-2">
                    <span>{article.formattedDate}</span>
                    <span className="text-slate-300 md:hidden">•</span>
                    <span className="md:hidden text-cobalt font-medium uppercase">
                      {article.categoryLabel}
                    </span>
                  </div>
                  <div className="md:col-span-7 flex flex-col gap-1.5">
                    <Link
                      to={`/thoughts/${article.slug}`}
                      className="group inline-block"
                    >
                      <h4 className="font-sans text-lg sm:text-xl text-ink group-hover:text-cobalt transition-colors font-semibold">
                        {article.title}
                      </h4>
                    </Link>
                    <p className="font-sans text-sm text-ink-muted max-w-[62ch] leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="md:col-span-3 flex md:flex-col md:items-end justify-between items-center gap-1 font-mono text-xs">
                    <span className="hidden md:inline-block text-cobalt font-medium uppercase tracking-wide">
                      {article.categoryLabel}
                    </span>
                    <span className="text-slate-400">{article.readingTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section: Dispatch / Field Log & Minimal Subscription */}
        <section className="w-full bg-white border border-slate-200 shadow-sm rounded-lg p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                <h3 className="font-sans text-xl text-ink font-bold">
                  Stay Updated
                </h3>
              </div>
              <p className="font-sans text-sm sm:text-base text-ink-muted max-w-[50ch] leading-relaxed">
                Occasional essays on systems engineering, architecture tradeoffs,
                and craft. Zero marketing fluff, strictly long-form insights.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2 w-full"
              >
                <input
                  type="email"
                  required
                  aria-label="Email address"
                  placeholder="engineer@domain.com"
                  className="bg-slate-50 border border-slate-200 text-ink text-sm px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cobalt/20 focus:border-cobalt flex-grow h-10 transition-all placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="bg-ink text-white font-mono text-xs uppercase tracking-widest px-6 py-2 rounded hover:bg-slate-800 transition-colors h-10 flex-shrink-0 cursor-pointer shadow-sm font-medium"
                >
                  Dispatch
                </button>
              </form>
              <div className="flex items-center justify-between font-mono text-xs text-slate-500">
                <a
                  href="/rss.xml"
                  target="_blank"
                  className="hover:text-cobalt transition-colors inline-flex items-center gap-1"
                >
                  <span>RSS XML Feed</span>
                  <span className="text-[10px]">↗</span>
                </a>
                <span className="text-slate-400">Delivered ~2x per quarter</span>
              </div>
              {subscribed && (
                <p className="font-mono text-xs text-cobalt font-medium">
                  ✓ Subscribed. System confirmation dispatched to your inbox.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
