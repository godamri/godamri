import type { LoaderFunctionArgs } from "react-router";
import { authorProfile } from "~/data/portfolio";
import { getAllThoughts } from "~/lib/content.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const thoughts = getAllThoughts();

  const escapeXml = (unsafe: string) =>
    unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const items = thoughts
    .map((thought) => {
      const link = `${baseUrl}/thoughts/${thought.slug}`;
      const pubDate = new Date(thought.date).toUTCString();

      return `    <item>
      <title>${escapeXml(thought.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(thought.excerpt)}</description>
      <category>${escapeXml(thought.categoryLabel)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(authorProfile.name)} — Thoughts &amp; Writing</title>
    <link>${baseUrl}/thoughts</link>
    <description>Reflections and technical essays on engineering, architecture, and systems by ${escapeXml(
      authorProfile.fullName
    )}.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
