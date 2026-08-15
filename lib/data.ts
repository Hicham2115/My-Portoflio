import type { StaticImageData } from "next/image";
import quicksyncCover from "@/app/assets/projects/quicksync/cover.png";
import saloraCover from "@/app/assets/projects/salora/cover.png";
import ariniLockCover from "@/app/assets/projects/arini-lock/cover.png";
import anissaCosmeticsCover from "@/app/assets/projects/anissa-cosmetics/cover.png";
import maisonCover from "@/app/assets/projects/nordique/cover.png";
import maisonOriaCover from "@/app/assets/projects/maison-oria/cover.png";
import chahrazadBabyCover from "@/app/assets/projects/chahrazad-baby/cover.png";
import safaaCreationsCover from "@/app/assets/projects/safaa-creations/cover.png";
import swiftwayCover from "@/app/assets/projects/swiftway/cover.png";

export type ProjectCategory = "Full Stack" | "Shopify";

export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  statValue: string;
  statLabel: string;
  category: ProjectCategory;
  protected?: boolean;
  tags: string[];
  cover: StaticImageData;
  url?: string;
}

export interface Principle {
  n: string;
  title: string;
  desc: string;
}

export interface Skill {
  n: string;
  title: string;
  desc: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "quicksync",
    name: "QuickSync",
    subtitle: "Full-Stack HR Management Platform",
    description:
      "An HR platform for managing employees, leave requests, and departments, with secure token-based auth and email verification.",
    statValue: "6",
    statLabel: "Person team, collaborative delivery",
    category: "Full Stack",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TanStack Query/Form",
      "Laravel",
      "Sanctum",
      "MySQL",
    ],
    cover: quicksyncCover,
    url: "https://github.com/Hicham2115/QuickSync",
  },
  {
    slug: "salora",
    name: "Salora",
    subtitle: "Multi-Tenant Salon Booking & Management SaaS",
    description:
      "A multi-tenant SaaS for salon owners to manage bookings, staff, and clients, with data isolated per salon and a public booking page.",
    statValue: "3",
    statLabel: "Languages supported: English, French, Arabic",
    category: "Full Stack",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TanStack Query/Form",
      "Laravel",
      "Sanctum",
      "MySQL",
    ],
    cover: saloraCover,
    url: "https://github.com/Hicham2115/Salora",
  },
  {
    slug: "arini-lock",
    name: "Arini Lock",
    subtitle: "Stallion Advertising · 2025",
    description:
      "A bilingual Shopify storefront for a smart door lock brand, with cash-on-delivery checkout and an AI shopping assistant.",
    statValue: "3",
    statLabel: "Languages: French, English, Arabic",
    category: "Shopify",
    protected: true,
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shopify Storefront + Admin API",
      "TanStack Query",
      "Zustand",
      "Groq",
    ],
    cover: ariniLockCover,
    url: "https://www.arinilock.ma/",
  },
  {
    slug: "anissa-cosmetics",
    name: "Anissa Cosmetics",
    subtitle: "Stallion Advertising · 2026",
    description:
      "A French-language luxury skincare storefront with live Shopify product data, smooth-scroll animations, and validated forms.",
    statValue: "5",
    statLabel: "Page templates, home to checkout",
    category: "Shopify",
    protected: true,
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Shopify Storefront API",
      "GSAP",
      "Lenis",
      "Zod",
    ],
    cover: anissaCosmeticsCover,
    url: "https://www.anissacosmetics.com/",
  },
  {
    slug: "maison",
    name: "Maison",
    subtitle: "Furniture E-Commerce Storefront",
    description:
      "An animated furniture storefront with cart and wishlist drawers, and pricing and checkout driven live from Shopify.",
    statValue: "2",
    statLabel: "Drawers: cart + wishlist",
    category: "Shopify",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Shopify Storefront API (GraphQL)",
      "TanStack Query",
      "Zustand",
      "GSAP + Lenis",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    cover: maisonCover,
    url: "https://e-commerce-furniture-gilt.vercel.app/",
  },
  {
    slug: "maison-oria",
    name: "Maison Oria",
    subtitle: "Luxury Handbag E-Commerce",
    description:
      "A luxury handbag storefront blending a Jacquemus-meets-Apple aesthetic with a persistent cart, wishlist, and live Shopify data.",
    statValue: "2",
    statLabel: "Persistent cart + wishlist",
    category: "Shopify",
    tags: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui (Base UI)",
      "Zustand",
      "TanStack Query",
      "Shopify Storefront API",
      "GSAP/Framer Motion",
    ],
    cover: maisonOriaCover,
    url: "https://e-com-bags.vercel.app/",
  },
  {
    slug: "chahrazad-baby",
    name: "Chahrazad Baby",
    subtitle: "Baby Clothing E-Commerce Storefront",
    description:
      "A French-language baby clothing storefront with product filters, cart, wishlist, and smooth animations for the Moroccan market.",
    statValue: "4",
    statLabel: "Core features: browsing, cart, wishlist, galleries",
    category: "Shopify",
    tags: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "TanStack Query",
      "Shopify Storefront API",
    ],
    cover: chahrazadBabyCover,
    url: "https://e-commerce-baby.vercel.app/",
  },
  {
    slug: "safaa-creations",
    name: "Safaa Creations",
    subtitle: "Moroccan-Inspired Fashion Boutique",
    description:
      "A Moroccan fashion storefront with luxury and wedding collections, GSAP animations, and smooth Lenis scrolling.",
    statValue: "2",
    statLabel: "Collections: luxury + wedding",
    category: "Shopify",
    tags: ["Next.js", "GSAP", "Lenis"],
    cover: safaaCreationsCover,
    url: "https://saffa-creations.vercel.app/",
  },
  {
    slug: "swiftway",
    name: "SwiftWay",
    subtitle: "Premium Delivery Management Platform",
    description:
      "A delivery tracking app with live customer tracking and an admin panel for managing orders from pickup to drop-off.",
    statValue: "2",
    statLabel: "Dashboards: live customer tracking + admin",
    category: "Full Stack",
    tags: ["Next.js", "React", "Express"],
    cover: swiftwayCover,
    url: "https://github.com/Hicham2115/Delivery",
  },
];

export const PRINCIPLES: Principle[] = [
  {
    n: "01",
    title: "Simple over clever",
    desc: "Minimal scope, no premature abstraction. Three similar lines beat a leaky helper built for a future that may not come.",
  },
  {
    n: "02",
    title: "Full-stack, end to end",
    desc: "Comfortable from a Laravel or Express.js API to a Next.js front end — same care applied to schema, endpoint and pixel.",
  },
  {
    n: "03",
    title: "Built to be found",
    desc: "SEO and GEO in mind from the first commit, so the work is discoverable by search engines and AI answer engines alike.",
  },
  {
    n: "04",
    title: "AI-augmented workflow",
    desc: "Claude Code, MCP and prompt engineering are part of how I build — used to move faster without cutting corners.",
  },
];

export const SKILLS: Skill[] = [
  {
    n: "01",
    title: "Frontend",
    desc: "React, Next.js, TypeScript, Tailwind, shadcn/ui",
  },
  {
    n: "02",
    title: "Backend",
    desc: "Laravel, PHP, Node.js, Express.js, Python",
  },
  {
    n: "03",
    title: "Data & Commerce",
    desc: "Supabase, SQL, MySQL, MongoDB, Shopify Storefront API",
  },
  {
    n: "04",
    title: "Tooling & AI",
    desc: "Git, TanStack Query, SEO/GEO, Claude Code, MCP",
  },
];

export const MARQUEE_ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Laravel",
  "Express.js",
  "Node.js",
  "My SQl",
  "MongoDB",
  "Python",
  "Tailwind CSS",
  "Supabase",
  "Shopify",
  "SEO / GEO",
];

export const STATS = [
  { value: 20, suffix: "+", label: "Projects shipped" },
  { value: 15, suffix: "+", label: "Tools & frameworks" },
  { value: 4, suffix: "", label: "Skill domains covered" },
  { value: 100, suffix: "%", label: "AI-assisted workflow" },
];
