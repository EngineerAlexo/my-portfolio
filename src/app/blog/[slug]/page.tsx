import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllPostsMeta, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-500">Blog Post</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{post.title}</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {formatDate(post.publishedAt)} · {post.readingTime}
        </p>
        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{post.description}</p>
        <div className="blog-content mt-10" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
