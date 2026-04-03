import Link from "next/link";

import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-sm text-slate-400 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} {siteConfig.fullName}</p>
        <div className="flex gap-4">
          <Link href={siteConfig.githubUrl} target="_blank" rel="noreferrer" className="hover:text-sky-300">
            GitHub
          </Link>
          <Link href={`mailto:${siteConfig.email}`} className="hover:text-sky-300">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
