import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogPostMeta } from "@/types/portfolio";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

export function BlogPreviewSection({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <SectionHeading
          eyebrow="Blog"
          title="Writing about code, career growth, and how I build."
          description="A lightweight markdown-based blog makes it easy to publish technical notes, project write-ups, and internship reflections."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 dark:border-white/10 dark:bg-slate-900/60"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {formatDate(post.publishedAt)} · {post.readingTime}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{post.description}</p>
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

        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:border-sky-500 hover:text-sky-600 dark:border-white/10 dark:text-white"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
