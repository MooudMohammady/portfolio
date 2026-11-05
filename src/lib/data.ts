/* ------------------------------------------------------------------ */
/*  Central content data — single source of truth for the whole site   */
/* ------------------------------------------------------------------ */

export type ProjectCategory = "fullstack" | "frontend" | "desktop";
export type ProjectStatus = "completed" | "in-progress" | "paused";
export type SkillCategory = "frontend" | "backend" | "database" | "tools";

/* ------------------------------- Projects ------------------------- */

export interface Project {
  slug: string;
  title: string;
  thumbnail: string;
  category: ProjectCategory;
  featured?: boolean;
  status: ProjectStatus;
  progress: number;
  tech: string[];
}

/** Tailwind chip color per technology (static classes so they get compiled). */
export const techColors: Record<string, string> = {
  "Next.js": "bg-white text-black",
  "React.js": "bg-sky-500 text-white",
  "Three.js": "bg-black text-white",
  Tailwind: "bg-cyan-500 text-white",
  TypeScript: "bg-blue-500 text-white",
  "Framer Motion": "bg-pink-500 text-white",
  MUI: "bg-blue-600 text-white",
  "shadcn/ui": "bg-zinc-900 text-white",
  "dnd-kit": "bg-indigo-500 text-white",
  Swiper: "bg-sky-400 text-white",
  Particles: "bg-indigo-400 text-white",
  "Node.js": "bg-green-600 text-white",
  MongoDB: "bg-emerald-500 text-white",
  "Electron.js": "bg-gray-800 text-white",
  Sass: "bg-pink-600 text-white",
  JavaScript: "bg-yellow-500 text-black",
  jQuery: "bg-sky-600 text-white",
  "Socket.io": "bg-white text-black",
};

export const projects: Project[] = [
  {
    slug: "iranverse",
    title: "Iranverse — Crypto Platform",
    thumbnail: "/images/website1.png",
    category: "frontend",
    featured: true,
    status: "in-progress",
    progress: 35,
    tech: ["Next.js", "React.js", "Three.js", "Tailwind", "TypeScript", "Framer Motion", "MUI"],
  },
  {
    slug: "project-management",
    title: "Project Management Service",
    thumbnail: "/images/website2.png",
    category: "fullstack",
    featured: true,
    status: "completed",
    progress: 95,
    tech: ["Next.js", "React.js", "Tailwind", "shadcn/ui", "TypeScript", "Framer Motion", "dnd-kit"],
  },
  {
    slug: "nft-marketplace",
    title: "NFT Marketplace",
    thumbnail: "/images/website3.png",
    category: "frontend",
    status: "completed",
    progress: 100,
    tech: ["Next.js", "React.js", "Tailwind", "TypeScript", "Framer Motion", "Swiper"],
  },
  {
    slug: "modern-portfolio",
    title: "Modern Portfolio",
    thumbnail: "/images/website4.png",
    category: "frontend",
    status: "completed",
    progress: 100,
    tech: ["Next.js", "React.js", "Tailwind", "TypeScript", "Framer Motion", "Particles"],
  },
  {
    slug: "e-commerce",
    title: "E-Commerce — Fullstack",
    thumbnail: "/images/website5.png",
    category: "fullstack",
    status: "paused",
    progress: 45,
    tech: ["Next.js", "React.js", "Tailwind", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    slug: "cms-v2",
    title: "CMS v2 — Fullstack",
    thumbnail: "/images/website6.png",
    category: "fullstack",
    status: "paused",
    progress: 67,
    tech: ["Next.js", "React.js", "Tailwind", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    slug: "desktop-ide",
    title: "Desktop IDE",
    thumbnail: "/images/website7.png",
    category: "desktop",
    status: "completed",
    progress: 85,
    tech: ["Electron.js", "Sass", "JavaScript", "jQuery", "Node.js"],
  },
  {
    slug: "e-learning",
    title: "E-Learning Platform",
    thumbnail: "/images/website8.png",
    category: "fullstack",
    featured: true,
    status: "completed",
    progress: 89,
    tech: ["Next.js", "React.js", "Tailwind", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    slug: "discord-clone",
    title: "Discord Clone — Fullstack",
    thumbnail: "/images/website9.png",
    category: "fullstack",
    status: "paused",
    progress: 63,
    tech: ["React.js", "Tailwind", "Socket.io", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    slug: "cms-v1",
    title: "CMS v1 — Fullstack",
    thumbnail: "/images/website10.png",
    category: "fullstack",
    status: "paused",
    progress: 45,
    tech: ["Next.js", "React.js", "Tailwind", "JavaScript", "Node.js", "MongoDB"],
  },
];

/* -------------------------------- Skills --------------------------- */

export interface Skill {
  name: string;
  image: string;
  category: SkillCategory;
  core?: boolean;
}

export const skills: Skill[] = [
  { name: "React.js", image: "/images/react.png", category: "frontend", core: true },
  { name: "Next.js", image: "/images/next.png", category: "frontend", core: true },
  { name: "TypeScript", image: "/images/ts.png", category: "frontend", core: true },
  { name: "JavaScript", image: "/images/js.png", category: "frontend", core: true },
  { name: "Tailwind CSS", image: "/images/tailwind.png", category: "frontend", core: true },
  { name: "Framer Motion", image: "/images/framer.png", category: "frontend" },
  { name: "HTML", image: "/images/html.png", category: "frontend" },
  { name: "CSS", image: "/images/css.png", category: "frontend" },
  { name: "SASS", image: "/images/sass.png", category: "frontend" },
  { name: "React Native", image: "/images/ReactNative.png", category: "frontend" },
  { name: "Material UI", image: "/images/mui.png", category: "frontend" },
  { name: "Redux", image: "/images/redux.png", category: "frontend" },
  { name: "React Query", image: "/images/reactquery.png", category: "frontend" },
  { name: "Electron.js", image: "/images/electornjs.png", category: "frontend" },
  { name: "Node.js", image: "/images/node-js.png", category: "backend", core: true },
  { name: "Express.js", image: "/images/express.png", category: "backend" },
  { name: "GraphQL", image: "/images/graphql.png", category: "backend" },
  { name: "Prisma", image: "/images/prisma.webp", category: "backend" },
  { name: "Socket.io", image: "/images/socket-io.png", category: "backend" },
  { name: "WebSocket", image: "/images/websocket.png", category: "backend" },
  { name: "NextAuth", image: "/images/logo-sm.png", category: "backend" },
  { name: "MongoDB", image: "/images/mongodb.png", category: "database" },
  { name: "PostgreSQL", image: "/images/postgres.png", category: "database" },
  { name: "MySQL", image: "/images/mysql.png", category: "database" },
  { name: "Docker", image: "/images/docker.webp", category: "tools" },
  { name: "Figma", image: "/images/figma.png", category: "tools" },
];

/* ------------------------------- Contacts -------------------------- */

export interface Contact {
  key: string;
  url: string;
  title: string;
  color: string;
}

export const contacts: Contact[] = [
  { key: "github", url: "https://github.com/MooudMohammady", title: "GitHub", color: "#e4e4e7" },
  { key: "linkedin", url: "https://www.linkedin.com/in/mooud-mohammadi-tabar-29624b266/", title: "LinkedIn", color: "#0a66c2" },
  { key: "telegram", url: "https://t.me/mooudmohammady", title: "Telegram", color: "#26a5e4" },
  { key: "instagram", url: "https://www.instagram.com/webclare.ir", title: "Instagram", color: "#e1306c" },
  { key: "youtube", url: "https://www.youtube.com/channel/UCY8EUIoJ889pYZ7ptsePLwg", title: "YouTube", color: "#ff0000" },
  { key: "discord", url: "https://discord.com/channels/@me/718730365199712283", title: "Discord", color: "#5865f2" },
  { key: "email", url: "mailto:mooudmohammadi@gmail.com", title: "Email", color: "#f59e0b" },
];

export const EMAIL = "mooudmohammadi@gmail.com";
export const SITE_URL = "https://webclare.ir";
export const PERSON_NAME = "Mooud Mohammadi Tabar";
export const PERSON_NAME_FA = "موعود محمدی تبار";

/* ------------------------------- Stats ----------------------------- */

export const stats = [
  { value: 4, suffix: "+" },
  { value: 10, suffix: "+" },
  { value: 25, suffix: "+" },
];
