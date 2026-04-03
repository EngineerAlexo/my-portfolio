import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200/70 bg-white/80 p-10 text-center dark:border-white/10 dark:bg-slate-900/60">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
          This page does not exist.
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
          The page may have been moved, removed, or never published.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
