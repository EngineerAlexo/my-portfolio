"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

import { navItems, siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071120]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#home" className="text-sm font-semibold tracking-[0.18em] text-sky-200">
          {siteConfig.fullName}
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                activeSection === item.id
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                  : "text-slate-300 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-slate-100"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav className="border-t border-white/10 px-6 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium transition",
                  activeSection === item.id
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                    : "text-slate-300 hover:bg-white/5",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
