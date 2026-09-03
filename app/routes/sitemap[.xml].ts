import type { LoaderFunctionArgs } from "react-router";
import { getAllThoughts } from "~/lib/content.server";

interface SitemapItem {
  loc: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const thoughts = getAllThoughts();

  const staticUrls: SitemapItem[] = [
    { loc: `${baseUrl}/`, priority: "1.0", changefreq: "monthly" },
    { loc: `${baseUrl}/thoughts`, priority: "0.9", changefreq: "weekly" },
  ];

  const thoughtUrls: SitemapItem[] = thoughts.map((t) => ({
    loc: `${baseUrl}/thoughts/${t.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: new Date(t.date).toISOString().split("T")[0],
  }));

  const allUrls: SitemapItem[] = [...staticUrls, ...thoughtUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ""}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
