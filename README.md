# Godamri — Modern Portfolio & Thought Sharing Platform

Website portofolio profesional dan platform *thought sharing* (technical essays & systems notes) berarsitektur modern dengan **React Router v7 (Vite)**, **SSR (Server-Side Rendering)**, dan target deploy di **Cloudflare Pages**.

---

## 🚀 Fitur Utama

- **React Router v7 Framework Mode + Vite**: SSR edge murni tanpa cold-start berkat runtime Cloudflare Workers/Pages.
- **Modern Typography & Editorial UI**: Desain minimalis terinspirasi publikasi teknis tingkat tinggi, memadukan font *Inter* untuk narasi editorial dan *JetBrains Mono* untuk metrik, data teknis, serta code snippets.
- **Thought Sharing Engine**:
  - Artikel teknis ditulis dalam format Markdown (`content/thoughts/*.md`) dengan frontmatter terstruktur.
  - Kompilasi build-time / loader-time menggunakan Vite's `import.meta.glob` (tanpa disk I/O runtime, 0ms response di edge).
  - *Syntax highlighting* berbasis Prism.js dengan container badge bahasa dan format rapi.
  - Interactive category filter (`All`, `Systems & Architecture`, `Backend & Infra`, `Fintech`, `Observability`) tersinkronisasi langsung dengan URL query param (`?category=systems`).
- **Interactive Technical Diagrams**: Diagram topologi stream (SVG) dan badge benchmark latency p99.
- **SEO & Edge Feeds**:
  - Dynamic OpenGraph & Twitter metadata pada setiap halaman.
  - Auto-generated **RSS 2.0 Feed** di `/rss.xml`.
  - Auto-generated **XML Sitemap** di `/sitemap.xml`.
- **Cloudflare Pages Ready**: Konfigurasi `wrangler.toml` dan `functions/[[path]].ts` untuk routing SSR dan serving aset statis global.

---

## 📁 Struktur Direktori

```text
├── app/
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.tsx         # Header sticky dengan glassmorphism & mobile drawer
│   │       └── Footer.tsx         # Footer editorial minimalis
│   ├── data/
│   │   └── portfolio.ts           # Profil, proyek terpilih, domain keahlian, & tools
│   ├── lib/
│   │   └── content.server.ts      # Markdown parser, reading time, & category aggregator
│   ├── routes/
│   │   ├── _index.tsx             # Halaman utama portofolio
│   │   ├── thoughts._index.tsx    # Halaman index writing / thoughts dengan category filter
│   │   ├── thoughts.$slug.tsx     # Halaman detail essay teknis
│   │   ├── rss[.xml].ts           # Edge route generator RSS feed
│   │   └── sitemap[.xml].ts       # Edge route generator XML sitemap
│   ├── app.css                    # Tailwind directives, fonts, & syntax highlighting styles
│   ├── entry.client.tsx           # Client hydration entry point
│   ├── entry.server.tsx           # Server-side streaming SSR entry point
│   ├── root.tsx                   # HTML document shell, meta tags, & Error Boundary
│   └── routes.ts                  # Deklarasi routing React Router v7
├── content/
│   └── thoughts/                  # File essay Markdown (.md)
│       ├── architecture-of-simplicity.md
│       ├── go-python-media-pipeline.md
│       ├── payment-systems-for-failure.md
│       ├── myth-of-microservices.md
│       ├── distributed-tracing-sampling.md
│       └── building-powerclip-video-encoding.md
├── functions/
│   └── [[path]].ts                # Cloudflare Pages catch-all handler
├── sample/                        # File HTML sampel acuan desain
├── wrangler.toml                  # Konfigurasi Cloudflare Pages
├── react-router.config.ts         # Konfigurasi React Router SSR
├── vite.config.ts                 # Konfigurasi Vite
└── tailwind.config.ts             # Konfigurasi tema Tailwind CSS
```

---

## 🛠️ Panduan Penggunaan Lokal

### 1. Menjalankan Server Development
```bash
npm run dev
```
Buka browser pada [http://localhost:5173](http://localhost:5173).

### 2. Verifikasi Typecheck & Build
```bash
# Cek validasi tipe TypeScript
npm run typecheck

# Build bundle client & server SSR
npm run build
```

---

## ✍️ Menambahkan Tulisan / Thought Baru

Cukup buat file Markdown baru di folder `content/thoughts/<slug-anda>.md` dengan format frontmatter berikut:

```markdown
---
title: "Judul Tulisan atau Essay Anda"
slug: "judul-tulisan-anda"
date: "2025-04-01"
category: "systems" # Pilih: "systems" | "infra" | "fintech" | "observability"
categoryLabel: "Systems & Architecture"
readingTime: "5 min read"
excerpt: "Ringkasan 1-2 kalimat mengenai essay atau catatan arsitektur ini."
featured: false
tags: ["Architecture", "Go", "Cloud"]
---

Tulis isi artikel di sini menggunakan format Markdown standar...
```

Vite akan secara otomatis mem-bundle artikel baru tersebut dan memperbarui halaman `/thoughts`, halaman detail artikel, `/rss.xml`, serta `/sitemap.xml`.

---

## ☁️ Deploy ke Cloudflare Pages

### Menggunakan Git (Direkomendasikan)
1. Hubungkan repository ini ke akun Cloudflare Pages Anda di dashboard Cloudflare.
2. Atur konfigurasi build:
   - **Framework preset**: `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `build/client`
   - **Root directory**: `/`
3. Tambahkan environment variable jika diperlukan (misalnya `NODE_VERSION: 22`).
4. Klik **Save and Deploy**. Cloudflare Pages akan secara otomatis mengkompilasi `functions/[[path]].ts` menjadi Cloudflare Pages Worker edge handler.

### Menggunakan Wrangler CLI
```bash
# Login ke Cloudflare (jika belum)
npx wrangler login

# Deploy manual
npm run build
npx wrangler pages deploy build/client
```
