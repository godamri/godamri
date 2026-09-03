export interface Project {
  id: string;
  num: string;
  title: string;
  description: string;
  stack: string;
  period: string;
  link?: string;
  external?: boolean;
}

export interface Domain {
  num: string;
  title: string;
  description: string;
}

export interface ToolCategory {
  category: string;
  skills: string;
}

export const authorProfile = {
  name: "GODAMRI",
  fullName: "Godamri",
  handle: "@godamri",
  role: "Software Engineer & Systems Builder",
  headline: "I build scalable, reliable software systems that drive business growth.",
  subheadline:
    "High-impact systems, transactional platforms, and automation across trading, fintech, retail POS, e-commerce, and AI.",
  aboutQuote:
    "“I like turning complicated technical problems into systems that are easier to understand, operate, and maintain.”",
  aboutParagraphs: [
    "I'm a software engineer with extensive experience building high-concurrency transactional platforms, payment infrastructure, and automated systems.",
    "Over the years, I've engineered core merchant platforms, retail Cloud POS systems, voucher & promotion rule engines, multi-principal loyalty ledgers, end-to-end e-commerce pipelines, algorithmic trading systems, and generative media automation.",
  ],
  socials: {
    github: "https://github.com/godamri",
    linkedin: "https://www.linkedin.com/in/godamri",
    twitter: "https://x.com/godamri",
    email: "mailto:contact@godamri.com",
  },
};

export const selectedWork: Project[] = [
  {
    id: "helix",
    num: "01",
    title: "HELIX",
    description: "Automated algorithmic trading system with real-time signal generation, dynamic risk management, and Telegram alerts.",
    stack: "Rust · Python · PostgreSQL · Redis Pub/Sub · WebSockets · Telegram Bot API",
    period: "2025–Present",
    link: "#",
    external: false,
  },
  {
    id: "nexus",
    num: "02",
    title: "NEXUS",
    description: "Generative AI video production platform with Whisper transcription, LiteLLM/Ollama orchestration, and automated FFmpeg pipelines.",
    stack: "Python · Go · Whisper · LiteLLM / Ollama · FFmpeg · Cloudflare R2",
    period: "2026",
    link: "#",
    external: false,
  },
  {
    id: "merchant-system",
    num: "03",
    title: "MERCHANT SYSTEM",
    description: "Multi-tier merchant management, QRIS/PPOB routing, settlement ledger, and merchant Billing APIs with in-app payment pop-up integration.",
    stack: "PHP (Laravel) · MariaDB · Redis · Payment & Billing APIs · HMAC Webhooks · Linux",
    period: "2019–2022",
    link: "#",
    external: false,
  },
  {
    id: "cloud-pos",
    num: "04",
    title: "CLOUD POS",
    description: "Online-to-Offline (O2O) retail counter system synchronizing e-commerce inventory with high-throughput in-store transactions and Accurate.id accounting.",
    stack: "PHP (Laravel Octane) · PostgreSQL · Redis · Accurate.id · Linux VPS",
    period: "2022–2024",
    link: "#",
    external: false,
  },
  {
    id: "promotion-system",
    num: "05",
    title: "PROMOTION SYSTEM",
    description: "High-concurrency campaign and voucher engine with zero-race-condition quota deductions and dynamic rule evaluation.",
    stack: "PHP (Laravel) · Redis (Atomic Lua Scripts) · MariaDB · Supervisor Queues",
    period: "2018–2019",
    link: "#",
    external: false,
  },
  {
    id: "ecommerce-system",
    num: "06",
    title: "ECOMMERCE SYSTEM",
    description: "End-to-end commerce engine with real-time inventory reservation, Algolia search, and Midtrans payment orchestration.",
    stack: "PHP (Laravel) · MariaDB · Redis · Algolia · Midtrans · GitLab CI/CD",
    period: "2020–2024",
    link: "#",
    external: false,
  },
  {
    id: "loyalty-system",
    num: "07",
    title: "LOYALTY SYSTEM",
    description: "Multi-principal rewards platform with event-driven points accrual, tier progression, and immutable audit ledgers.",
    stack: "PHP (Laravel) · MariaDB · Redis · Event-Driven Points Ledger · Scheduled Batch Workers",
    period: "2020–2022",
    link: "#",
    external: false,
  },
];

export const domains: Domain[] = [
  {
    num: "01",
    title: "Trading Systems",
    description: "Algorithmic Execution · Risk Controls · Signal Generators · Market Telemetry",
  },
  {
    num: "02",
    title: "Fintech & Payments",
    description: "QRIS Acquirer · PPOB Billers · Merchant Billing APIs · Settlement Ledgers",
  },
  {
    num: "03",
    title: "Retail Cloud POS (O2O)",
    description: "Physical Store Counters · Real-Time Inventory Sync · Accurate.id Accounting",
  },
  {
    num: "04",
    title: "E-Commerce & Promotions",
    description: "Zero-Overselling Inventory · High-Concurrency Flash Sales · Dynamic Rule Engines",
  },
  {
    num: "05",
    title: "AI & Media Automation",
    description: "Generative Video · Speech-to-Text (Whisper) · LLM Orchestration · FFmpeg Pipelines",
  },
];

export const toolset: ToolCategory[] = [
  {
    category: "Languages",
    skills: "PHP · Go · Python · Rust · TypeScript",
  },
  {
    category: "Frameworks & Runtimes",
    skills: "Laravel (Octane) · React · Next.js · FastAPI",
  },
  {
    category: "Data & Storage",
    skills: "PostgreSQL · MariaDB · Redis · Algolia · Cloudflare R2",
  },
  {
    category: "Integrations & APIs",
    skills: "Midtrans · Accurate.id · Telegram Bot API · LiteLLM / Ollama · HMAC Webhooks",
  },
  {
    category: "Infrastructure & Ops",
    skills: "Linux Server / VPS · Docker · WebSockets · GitLab CI/CD · Supervisor",
  },
  {
    category: "Engineering & Architecture",
    skills: "Concurrency Control (Lua Scripts) · Settlement & Ledgers · O2O Sync · Order State Machines",
  },
];
