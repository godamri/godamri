import matter from "gray-matter";
import { marked } from "marked";
import Prism from "prismjs";
import readingTime from "reading-time";

// Import Prism languages
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-go.js";
import "prismjs/components/prism-python.js";
import "prismjs/components/prism-sql.js";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-rust.js";
import "prismjs/components/prism-yaml.js";

export interface ThoughtMeta {
  title: string;
  slug: string;
  date: string;
  formattedDate: string;
  category: string;
  categoryLabel: string;
  readingTime: string;
  excerpt: string;
  featured?: boolean;
  metric?: string;
  metricDetail?: string;
  tags?: string[];
}

export interface ThoughtDetail extends ThoughtMeta {
  content: string;
  htmlContent: string;
}

export interface CategoryInfo {
  id: string;
  label: string;
  count: number;
}

// Category display mapping
export const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  systems: "Systems & Architecture",
  infra: "Backend & Infra",
  fintech: "Fintech",
  observability: "Observability",
};

// Configure marked with Prism syntax highlighting
const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

marked.use({
  renderer: {
    code({ text, lang }: { text: string; lang?: string }) {
      const language = lang && Prism.languages[lang] ? lang : "plain";
      const grammar = Prism.languages[language];
      const highlighted = grammar
        ? Prism.highlight(text, grammar, language)
        : escapeHtml(text);
      return `<div class="relative my-8 rounded-lg overflow-hidden border border-slate-200 bg-white shadow-2xs">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs font-mono">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-slate-300"></span>
            <span class="uppercase tracking-wider font-semibold text-slate-700">${language}</span>
          </div>
          <span class="text-slate-400 text-[11px] font-mono">source</span>
        </div>
        <pre class="!m-0 !p-5 !bg-[#F8FAFC] language-${language} overflow-x-auto text-[13.5px] leading-relaxed font-mono"><code class="language-${language}">${highlighted}</code></pre>
      </div>`;
    },
  },
});

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// Read markdown files using Vite's import.meta.glob (bundled at compile-time for edge SSR)
const markdownFiles = import.meta.glob<string>(
  "../../content/thoughts/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  }
);

export function getAllThoughts(): ThoughtMeta[] {
  const thoughts: ThoughtMeta[] = [];

  for (const [filepath, rawContent] of Object.entries(markdownFiles)) {
    const { data, content } = matter(rawContent);
    const slug =
      data.slug ||
      filepath.split("/").pop()?.replace(/\.md$/, "") ||
      "";

    const calcReading = readingTime(content);
    const category = data.category || "systems";

    thoughts.push({
      title: data.title || "Untitled Thought",
      slug,
      date: data.date || new Date().toISOString(),
      formattedDate: formatDate(data.date),
      category,
      categoryLabel:
        data.categoryLabel || CATEGORY_LABELS[category] || category,
      readingTime: data.readingTime || calcReading.text,
      excerpt: data.excerpt || content.slice(0, 160).trim() + "...",
      featured: Boolean(data.featured),
      metric: data.metric,
      metricDetail: data.metricDetail,
      tags: data.tags || [],
    });
  }

  // Sort descending by date
  return thoughts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getThoughtBySlug(
  slug: string
): Promise<ThoughtDetail | null> {
  for (const [filepath, rawContent] of Object.entries(markdownFiles)) {
    const { data, content } = matter(rawContent);
    const itemSlug =
      data.slug ||
      filepath.split("/").pop()?.replace(/\.md$/, "") ||
      "";

    if (itemSlug === slug) {
      const calcReading = readingTime(content);
      const category = data.category || "systems";
      const htmlContent = await marked.parse(content);

      return {
        title: data.title || "Untitled Thought",
        slug,
        date: data.date || new Date().toISOString(),
        formattedDate: formatDate(data.date),
        category,
        categoryLabel:
          data.categoryLabel || CATEGORY_LABELS[category] || category,
        readingTime: data.readingTime || calcReading.text,
        excerpt: data.excerpt || content.slice(0, 160).trim() + "...",
        featured: Boolean(data.featured),
        metric: data.metric,
        metricDetail: data.metricDetail,
        tags: data.tags || [],
        content,
        htmlContent,
      };
    }
  }

  return null;
}

export function getCategories(): CategoryInfo[] {
  const thoughts = getAllThoughts();
  const counts: Record<string, number> = { all: thoughts.length };

  for (const t of thoughts) {
    counts[t.category] = (counts[t.category] || 0) + 1;
  }

  const categoryOrder = ["all", "systems", "infra", "fintech", "observability"];

  return categoryOrder
    .filter((id) => id === "all" || counts[id] !== undefined)
    .map((id) => ({
      id,
      label: CATEGORY_LABELS[id] || id,
      count: counts[id] || 0,
    }));
}
