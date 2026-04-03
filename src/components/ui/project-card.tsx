import Link from "next/link";
import { Code2 } from "lucide-react";

import type { Project } from "@/types/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-indigo-400/12 bg-[linear-gradient(180deg,rgba(79,70,229,0.10),rgba(10,22,42,0.92))] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-300/25">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-400/12 blur-2xl" />
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-300" />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              {project.stack[0] ?? "Project"}
            </p>
          </div>
          <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
          <p className="text-sm leading-7 text-slate-300">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-indigo-400/12 bg-white/6 px-3 py-1 text-xs text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-400/14 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:border-indigo-300/30 hover:text-indigo-200"
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
