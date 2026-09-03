import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";
import { authorProfile } from "~/data/portfolio";
import { getThoughtBySlug } from "~/lib/content.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.thought) {
    return [{ title: "Thought Not Found — " + authorProfile.name }];
  }

  const { thought } = data;
  return [
    { title: `${thought.title} — ${authorProfile.name}` },
    { name: "description", content: thought.excerpt },
    { property: "og:title", content: `${thought.title} — ${authorProfile.name}` },
    { property: "og:description", content: thought.excerpt },
    { property: "og:type", content: "article" },
    { property: "og:site_name", content: "Godamri" },
    { property: "article:published_time", content: thought.date },
    { property: "article:author", content: authorProfile.fullName },
    { property: "article:section", content: thought.categoryLabel },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: authorProfile.handle },
    { name: "twitter:title", content: `${thought.title} — ${authorProfile.name}` },
    { name: "twitter:description", content: thought.excerpt },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) {
    throw new Response("Missing slug parameter", { status: 400 });
  }

  const thought = await getThoughtBySlug(slug);
  if (!thought) {
    throw new Response("Thought Not Found", { status: 404 });
  }

  return { thought };
}

export default function ThoughtDetailPage() {
  const { thought } = useLoaderData<typeof loader>();

  return (
    <article className="max-w-[860px] mx-auto px-5 lg:px-8 py-8 sm:py-14">
      {/* Top Navigation */}
      <div className="mb-8">
        <Link
          to="/thoughts"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-cobalt transition-colors group font-medium"
        >
          <span className="transform group-hover:-translate-x-0.5 transition-transform">
            ←
          </span>
          Back to Thoughts
        </Link>
      </div>

      {/* Article Header */}
      <header className="border-b border-slate-200 pb-8 sm:pb-12 mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs">
          <span className="text-cobalt font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-blue-50 border border-blue-200/60">
            {thought.categoryLabel}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">{thought.formattedDate}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">{thought.readingTime}</span>
        </div>

        <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.15] mb-6">
          {thought.title}
        </h1>

        <p className="font-sans text-lg sm:text-xl text-ink-muted leading-relaxed font-normal">
          {thought.excerpt}
        </p>

        {thought.metric && (
          <div className="mt-8 p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cobalt"></span>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-600 font-medium">
                Verified Benchmark
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-cobalt bg-white border border-blue-200 px-3 py-1 rounded shadow-2xs">
                {thought.metric}
              </span>
              {thought.metricDetail && (
                <span className="font-mono text-xs text-slate-500">
                  {thought.metricDetail}
                </span>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Article Body */}
      <div
        className="prose prose-slate prose-lg max-w-none 
          prose-headings:font-sans prose-headings:font-bold prose-headings:text-ink prose-headings:tracking-tight
          prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-ink-muted prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-[17px]
          prose-li:text-ink-muted prose-li:text-base sm:prose-li:text-[17px]
          prose-strong:text-ink prose-strong:font-semibold
          prose-a:text-cobalt prose-a:font-medium hover:prose-a:underline
          prose-code:font-mono prose-code:text-cobalt prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-blockquote:border-l-4 prose-blockquote:border-cobalt prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-slate-600"
        dangerouslySetInnerHTML={{ __html: thought.htmlContent }}
      />

      {/* Article Footer & Tags */}
      <footer className="mt-16 pt-8 border-t border-slate-200">
        {thought.tags && thought.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="font-mono text-xs text-slate-400 mr-2">Tags:</span>
            {thought.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-mono text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-cobalt font-semibold mb-1">
              Author
            </div>
            <h4 className="font-sans text-lg font-bold text-ink flex items-center gap-2">
              <span>{authorProfile.fullName}</span>
              <span className="font-mono text-xs font-normal text-cobalt">{authorProfile.handle}</span>
            </h4>
            <p className="font-sans text-sm text-ink-muted mt-1 max-w-md">
              {authorProfile.role}. Writing on systems architecture, resilience, and software craft.
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <a
              href={authorProfile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-cobalt transition-colors inline-flex items-center gap-1"
            >
              GitHub ↗
            </a>
            <span className="text-slate-300">·</span>
            <a
              href={authorProfile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-cobalt transition-colors inline-flex items-center gap-1"
            >
              LinkedIn ↗
            </a>
            <span className="text-slate-300">·</span>
            <a
              href={authorProfile.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-cobalt transition-colors inline-flex items-center gap-1"
            >
              X ↗
            </a>
          </div>
        </div>
      </footer>
    </article>
  );
}
