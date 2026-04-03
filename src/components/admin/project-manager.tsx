"use client";

import { LoaderCircle, LogOut, Pencil, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAuthUser } from "@/hooks/use-auth-user";
import { isAdminEmail, signInWithGoogle, signOutUser } from "@/lib/firebase/auth";
import { getProjects, removeProject, saveProject } from "@/lib/firebase/firestore";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

type ProjectFormState = {
  id: string;
  title: string;
  description: string;
  stack: string;
  githubUrl: string;
  demoUrl: string;
  image: string;
  featured: boolean;
  published: boolean;
};

const initialFormState: ProjectFormState = {
  id: "",
  title: "",
  description: "",
  stack: "",
  githubUrl: "",
  demoUrl: "",
  image: "/projects/dev-showcase.svg",
  featured: false,
  published: true,
};

function toFormState(project?: Project): ProjectFormState {
  if (!project) {
    return initialFormState;
  }

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    stack: project.stack.join(", "),
    githubUrl: project.githubUrl ?? "",
    demoUrl: project.demoUrl ?? "",
    image: project.image,
    featured: Boolean(project.featured),
    published: project.published !== false,
  };
}

export function ProjectManager() {
  const firebaseReady = isFirebaseConfigured();
  const { user, isLoading: isAuthLoading } = useAuthUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [formState, setFormState] = useState<ProjectFormState>(initialFormState);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  const isAdmin = useMemo(() => isAdminEmail(user?.email), [user?.email]);

  async function loadProjects() {
    setIsLoadingProjects(true);

    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to load projects.");
    } finally {
      setIsLoadingProjects(false);
    }
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  const handleChange = <K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) => {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleEdit = (project: Project) => {
    setSelectedId(project.id);
    setFormState(toFormState(project));
    setStatus(null);
  };

  const handleSignIn = async () => {
    setStatus(null);

    try {
      await signInWithGoogle();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to sign in right now.");
    }
  };

  const resetForm = () => {
    setSelectedId(null);
    setFormState(initialFormState);
  };

  const handleSave = async () => {
    setStatus(null);
    setIsSubmitting(true);

    try {
      const nextId =
        formState.id ||
        formState.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") ||
        crypto.randomUUID();

      await saveProject({
        id: nextId,
        title: formState.title,
        description: formState.description,
        stack: formState.stack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        githubUrl: formState.githubUrl,
        demoUrl: formState.demoUrl,
        image: formState.image,
        featured: formState.featured,
        published: formState.published,
      });

      setStatus("Project saved successfully.");
      resetForm();
      await loadProjects();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    setStatus(null);

    try {
      await removeProject(projectId);
      if (selectedId === projectId) {
        resetForm();
      }
      setStatus("Project deleted successfully.");
      await loadProjects();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to delete project.");
    }
  };

  if (!firebaseReady) {
    return (
      <div className="rounded-[2rem] border border-dashed border-sky-500/30 bg-sky-500/10 p-8 text-sm leading-7 text-sky-900 dark:text-sky-200">
        Firebase is not configured yet. The dashboard UI is ready, but sign-in and Firestore project management
        will activate after you add your real Firebase environment variables.
      </div>
    );
  }

  if (isAuthLoading) {
    return (
      <div className="flex min-h-[16rem] items-center justify-center rounded-[2rem] border border-slate-200/70 bg-white/80 dark:border-white/10 dark:bg-slate-900/60">
        <LoaderCircle className="h-6 w-6 animate-spin text-sky-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 dark:border-white/10 dark:bg-slate-900/60">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-sky-500" />
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Protected Admin Access</h2>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Sign in with Google to manage Firestore-backed projects. Access is restricted by the email list in
          `NEXT_PUBLIC_ADMIN_EMAILS`.
        </p>
        <button
          type="button"
          onClick={() => void handleSignIn()}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 dark:bg-white dark:text-slate-950"
        >
          Sign in with Google
        </button>
        {status ? <p className="mt-4 text-sm text-rose-600 dark:text-rose-300">{status}</p> : null}
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-rose-500/20 bg-rose-500/10 p-8 text-sm leading-7 text-rose-800 dark:text-rose-200">
        You are signed in as {user.email}, but this email is not allowed to manage projects. Add your email to
        `NEXT_PUBLIC_ADMIN_EMAILS` and redeploy, then try again.
      </div>
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 dark:border-white/10 dark:bg-slate-900/60">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              {selectedId ? "Edit Project" : "Add Project"}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Update the homepage portfolio cards by writing directly to Firestore.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void signOutUser()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 dark:border-white/10 dark:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        <div className="mt-8 grid gap-4">
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span>Title</span>
            <input
              value={formState.title}
              onChange={(event) => handleChange("title", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span>Description</span>
            <textarea
              rows={5}
              value={formState.description}
              onChange={(event) => handleChange("description", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span>Tech stack (comma separated)</span>
            <input
              value={formState.stack}
              onChange={(event) => handleChange("stack", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-white/5"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <span>GitHub URL</span>
              <input
                value={formState.githubUrl}
                onChange={(event) => handleChange("githubUrl", event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-white/5"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <span>Live demo URL</span>
              <input
                value={formState.demoUrl}
                onChange={(event) => handleChange("demoUrl", event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-white/5"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span>Image path</span>
            <input
              value={formState.image}
              onChange={(event) => handleChange("image", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-white/5"
            />
          </label>

          <div className="flex flex-wrap gap-6 text-sm text-slate-700 dark:text-slate-200">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={formState.featured}
                onChange={(event) => handleChange("featured", event.target.checked)}
              />
              Featured
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={formState.published}
                onChange={(event) => handleChange("published", event.target.checked)}
              />
              Published
            </label>
          </div>

          {status ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              {status}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:opacity-60 dark:bg-white dark:text-slate-950"
            >
              {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {selectedId ? "Update project" : "Create project"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 dark:border-white/10 dark:text-white"
            >
              Reset form
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 dark:border-white/10 dark:bg-slate-900/60">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Published Project Data</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Manage cards shown on the homepage. This list reloads from Firestore after every write.
        </p>

        <div className="mt-8 space-y-4">
          {isLoadingProjects ? (
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Loading projects...
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className={cn(
                  "rounded-3xl border px-5 py-5 transition",
                  selectedId === project.id
                    ? "border-sky-500/40 bg-sky-500/10"
                    : "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5",
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-xl space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{project.title}</h3>
                      {project.featured ? (
                        <span className="rounded-full bg-sky-500/10 px-2 py-1 text-xs font-medium text-sky-600 dark:text-sky-300">
                          Featured
                        </span>
                      ) : null}
                      {project.published === false ? (
                        <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-white/10 dark:text-slate-300">
                          Draft
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{project.stack.join(" · ")}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 dark:border-white/10 dark:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(project.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-700 dark:text-rose-200"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
