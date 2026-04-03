export function ProjectCardSkeleton() {
  return (
    <div className="rounded-3xl border border-indigo-400/12 bg-white/6 p-6">
      <div className="space-y-4">
        <div className="h-6 w-2/3 animate-pulse rounded-full bg-slate-700" />
        <div className="h-4 w-full animate-pulse rounded-full bg-slate-800" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-800" />
        <div className="flex gap-2">
          <div className="h-7 w-16 animate-pulse rounded-full bg-slate-800" />
          <div className="h-7 w-20 animate-pulse rounded-full bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
