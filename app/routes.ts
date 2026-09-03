import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("thoughts", "routes/thoughts._index.tsx"),
  route("thoughts/:slug", "routes/thoughts.$slug.tsx"),
  route("rss.xml", "routes/rss[.xml].ts"),
  route("sitemap.xml", "routes/sitemap[.xml].ts"),
] satisfies RouteConfig;
