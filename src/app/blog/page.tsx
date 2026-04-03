import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllPostsMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical notes, project reflections, and learning logs.",
};

export default async function BlogPage() {
  const posts = await getAllPostsMeta();

  return (
    <div className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-500">Blog</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Writing about building products, improving code, and growing as a developer.
          </h1>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            Posts are sourced from local markdown files, which keeps publishing simple and version-controlled.
          </p>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 dark:border-white/10 dark:bg-slate-900/60"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {formatDate(post.publishedAt)} · {post.readingTime}
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{post.title}</h2>
              <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">{post.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-sky-600 dark:text-white dark:hover:text-sky-300"
              >
                Read article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
