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
    "Software, platforms, and automation across fintech, trading, media, AI, and enterprise.",
  aboutQuote:
    "“I like turning complicated technical problems into systems that are easier to understand, operate, and maintain.”",
  aboutParagraphs: [
    "I'm a software engineer with a background in backend development, quality engineering, systems, and IT operations.",
    "I've worked across payment systems, trading infrastructure, media automation, AI systems, and internal enterprise platforms.",
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
    description: "Trading & execution system.",
    stack: "Rust · Python · PostgreSQL · Redis",
    period: "2024–Present",
    link: "#",
    external: false,
  },
  {
    id: "nexus",
    num: "02",
    title: "NEXUS",
    description: "AI video generation and media production platform.",
    stack: "Go · Python · Next.js",
    period: "2024",
    link: "#",
    external: false,
  },
  {
    id: "powerclip",
    num: "03",
    title: "POWERCLIP",
    description: "Automated video processing and short-form content platform.",
    stack: "Python · FFmpeg · Redis · PostgreSQL",
    period: "2023",
    link: "#",
    external: false,
  },
  {
    id: "digital-self",
    num: "04",
    title: "DIGITAL SELF",
    description: "Personal intelligence and knowledge system.",
    stack: "Go · Python · Next.js · PostgreSQL",
    period: "2023",
    link: "#",
    external: false,
  },
];

export const domains: Domain[] = [
  {
    num: "01",
    title: "Fintech",
    description: "Payments · QRIS · PPOB · Transaction Systems",
  },
  {
    num: "02",
    title: "Trading",
    description: "Execution · Market Systems · Risk · Telemetry",
  },
  {
    num: "03",
    title: "Media",
    description: "Video Processing · Content Automation",
  },
  {
    num: "04",
    title: "AI",
    description: "Generative Media · AI Workflows · Knowledge Systems",
  },
  {
    num: "05",
    title: "Enterprise",
    description: "Internal Systems · QA · IT Operations",
  },
];

export const toolset: ToolCategory[] = [
  {
    category: "Languages",
    skills: "Go · PHP · Python · TypeScript",
  },
  {
    category: "Frameworks",
    skills: "Laravel · Next.js · FastAPI · React",
  },
  {
    category: "Data & Messaging",
    skills: "PostgreSQL · Redis · NATS · Redpanda · pgvector",
  },
  {
    category: "Infrastructure",
    skills: "Docker · Linux · Cloudflare · CI/CD",
  },
  {
    category: "Engineering",
    skills: "Distributed Systems · Automation · Reliability · Observability",
  },
];
