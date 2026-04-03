import type { CTA, NavItem, Project, SkillGroup, TimelineItem } from "@/types/portfolio";

export const siteConfig = {
  name: "Haile",
  fullName: "Haile Yilma",
  role: "3rd Year Computer Science Student | Desktop & Mobile Developer",
  intro:
    "I specialize in building desktop and mobile software solutions with a strong focus on performance, usability, and practical problem-solving.",
  location: "Oda Bultum University, Ethiopia",
  email: "engineerhaile@gmail.com",
  phone: "+251979005248",
  profileImage: "/New%20folder/profile-photo.svg.svg",
  githubUrl: "https://github.com/EngineerAlexo",
  linkedinUrl: "",
  resumeUrl: "#contact",
  heroStats: [
    { label: "Projects", value: "5+" },
    { label: "Platforms", value: "Desktop & Mobile" },
    { label: "Focus", value: "Real-World Solutions" },
  ],
} as const;

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const heroCtas: CTA[] = [
  {
    href: "#projects",
    label: "View Projects",
    variant: "primary",
  },
  {
    href: "#contact",
    label: "Contact Me",
    variant: "secondary",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    items: ["Dart (Flutter)", "JavaScript", "C#", "C++", "Python", "Java", "PHP"],
  },
  {
    title: "Frameworks & Platforms",
    items: ["Flutter", "Next.js", "Firebase Authentication", "Firestore", "Responsive Web Apps"],
  },
  {
    title: "Tools & Environments",
    items: ["Visual Studio Code", "Visual Studio Community", "DBeaver", "Git", "GitHub"],
  },
];

export const aboutHighlights = [
  "I’m Haile Yilma, a third-year Computer Science student at Oda Bultum University with a strong passion for building real-world software solutions. I specialize in developing both desktop and mobile applications, focusing on performance, usability, and practical problem-solving.",
  "I have hands-on experience designing and developing tools that solve real user needs, from system utilities to modern mobile applications. I enjoy working across multiple technologies and continuously improving my skills to stay aligned with modern software development practices.",
  "My goal is to become a highly skilled software engineer, contributing to impactful projects in areas like application development, automation tools, and scalable systems.",
];

export const timeline: TimelineItem[] = [
  {
    title: "Computer Science Student",
    organization: "Oda Bultum University",
    period: "2023 - Present",
    description:
      "Building strong foundations in software engineering while continuously improving through practical projects, experimentation, and independent learning.",
  },
  {
    title: "Application Developer",
    organization: "Independent Projects",
    period: "2024 - Present",
    description:
      "Designing desktop tools and mobile apps focused on performance, usability, real-time features, and practical workflows that solve real user problems.",
  },
];

export const fallbackProjects: Project[] = [
  {
    id: "mosotool",
    title: "MosoTool",
    description:
      "A powerful utility tool designed for device management and automation, including advanced operations and system-level functionalities.",
    stack: ["C#", "Desktop Development", "Automation", "System Utilities"],
    githubUrl: "https://github.com/EngineerAlexo",
    demoUrl: "",
    image: "/projects/mosotool.svg",
    featured: true,
    published: true,
    createdAt: "2026-01-15T12:00:00.000Z",
    updatedAt: "2026-01-15T12:00:00.000Z",
  },
  {
    id: "remedial-zone",
    title: "Remedial Zone",
    description:
      "An educational platform aimed at helping students improve their knowledge through structured learning resources and interactive features.",
    stack: ["Flutter", "Dart", "Firebase", "Mobile UI"],
    githubUrl: "https://drive.google.com/file/d/10SY0FXhtWUSd_WNFB-Y1A-eNRocEYKIF/view?usp=drive_link",
    demoUrl: "",
    image: "/projects/remedial-zone.svg",
    featured: true,
    published: true,
    createdAt: "2026-02-20T12:00:00.000Z",
    updatedAt: "2026-02-20T12:00:00.000Z",
  },
  {
    id: "freshman-app",
    title: "FreshMan App",
    description:
      "A student-focused application designed to assist new university students with guidance, resources, and essential campus information.",
    stack: ["Flutter", "Dart", "Firebase", "Student Services"],
    githubUrl: "https://github.com/EngineerAlexo",
    demoUrl: "",
    image: "/projects/freshman-app.svg",
    featured: true,
    published: true,
    createdAt: "2026-03-10T12:00:00.000Z",
    updatedAt: "2026-03-10T12:00:00.000Z",
  },
  {
    id: "unlock-pro-tool",
    title: "Unlock Pro Tool",
    description:
      "A specialized desktop application focused on device unlocking and system-level operations with efficiency and reliability.",
    stack: ["C#", "Desktop Tools", "System Operations", "Utilities"],
    githubUrl: "https://github.com/EngineerAlexo/Unlock-Pro-Tool",
    demoUrl: "",
    image: "/projects/unlock-pro-tool.svg",
    featured: false,
    published: true,
    createdAt: "2026-03-25T12:00:00.000Z",
    updatedAt: "2026-03-25T12:00:00.000Z",
  },
  {
    id: "chat-app",
    title: "Chat App",
    description:
      "A real-time messaging application supporting modern communication features such as text messaging and media sharing.",
    stack: ["Flutter", "Firebase", "Realtime Messaging", "Mobile App"],
    githubUrl: "https://github.com/EngineerAlexo",
    demoUrl: "",
    image: "/projects/chat-app.svg",
    featured: false,
    published: true,
    createdAt: "2026-04-01T12:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z",
  },
];
