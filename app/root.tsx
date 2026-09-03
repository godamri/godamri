import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon.png" },
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous" as const,
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..700;1,14..32,300..700&family=JetBrains+Mono:wght@400;500;600&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body className="bg-surface text-ink font-sans antialiased min-h-screen flex flex-col selection:bg-cobalt selection:text-white">
        <Navbar />
        <main className="flex-1 w-full pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 - Page Not Found" : `Error ${error.status}`;
    details =
      error.status === 404
        ? "The page you are looking for does not exist or has moved."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="max-w-content mx-auto px-6 py-24 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-red-200 bg-red-50 text-xs font-mono uppercase tracking-widest text-red-600 mb-6 font-medium">
        Error Status
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink mb-4">{message}</h1>
      <p className="text-ink-muted text-base sm:text-lg max-w-lg mx-auto mb-8">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto text-left text-xs font-mono bg-slate-900 text-slate-100 rounded-lg max-w-2xl mx-auto mb-8">
          <code>{stack}</code>
        </pre>
      )}
      <a
        href="/"
        className="inline-flex items-center justify-center bg-ink text-white text-xs uppercase tracking-widest font-mono font-medium px-6 py-3 rounded-full hover:bg-cobalt transition-colors"
      >
        ← Return Home
      </a>
    </main>
  );
}
