import type { MetadataRoute } from "next";

import { getAllPostsMeta } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsMeta();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-portfolio.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
    })),
  ];
}
