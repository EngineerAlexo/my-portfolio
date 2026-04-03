import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import type { BlogPost, BlogPostMeta } from "@/types/portfolio";

const blogDirectory = path.join(process.cwd(), "src", "content", "blog");

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 180));
  return `${minutes} min read`;
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(blogDirectory).filter((name) => name.endsWith(".md"));
  const posts = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(path.join(blogDirectory, filename), "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      publishedAt: String(data.publishedAt ?? new Date().toISOString()),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingTime: getReadingTime(content),
    };
  });

  return posts.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    publishedAt: String(data.publishedAt ?? new Date().toISOString()),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: getReadingTime(content),
    content: processed.toString(),
  };
}
