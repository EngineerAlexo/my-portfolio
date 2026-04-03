export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col gap-6 px-6 py-20">
      <div className="h-16 w-2/3 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
      <div className="h-6 w-1/2 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-[2rem] border border-slate-200/70 bg-white/60 dark:border-white/10 dark:bg-slate-900/60"
          />
        ))}
      </div>
    </div>
  );
}
