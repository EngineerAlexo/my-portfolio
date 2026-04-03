"use client";

import { useEffect, useState } from "react";

import { fallbackProjects } from "@/data/site";
import { getProjects } from "@/lib/firebase/firestore";
import type { Project } from "@/types/portfolio";

export function useProjectData() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadProjects() {
      try {
        const items = await getProjects();
        if (!ignore) {
          setProjects(items.filter((project) => project.published !== false));
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load projects.");
          setProjects(fallbackProjects);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      ignore = true;
    };
  }, []);

  return { projects, isLoading, error };
}
