export type NavItem = {
  id: string;
  label: string;
};

export type CTA = {
  href: string;
  label: string;
  external?: boolean;
  variant?: "primary" | "secondary";
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
  image: string;
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactMessage = ContactFormValues & {
  createdAt?: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
};

export type BlogPost = BlogPostMeta & {
  content: string;
};
