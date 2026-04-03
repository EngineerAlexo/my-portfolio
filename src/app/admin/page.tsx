import type { Metadata } from "next";

import { ProjectManager } from "@/components/admin/project-manager";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Protected dashboard for managing portfolio projects.",
};

export default function AdminPage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-500">Admin</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Manage project content from a protected dashboard.
          </h1>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            Sign in with Google, then add, update, or remove projects stored in Firestore. The homepage project
            cards can render dynamically from this data source.
          </p>
        </div>
        <ProjectManager />
      </div>
    </div>
  );
}
