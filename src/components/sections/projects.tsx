"use client";

import { motion } from "framer-motion";

import { useProjectData } from "@/hooks/use-project-data";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectCardSkeleton } from "@/components/ui/project-card-skeleton";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProjectsSection() {
  const { projects, isLoading, error } = useProjectData();

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto rounded-[36px] border border-indigo-400/12 bg-[linear-gradient(180deg,rgba(79,70,229,0.10),rgba(8,17,32,0.25))] p-8 md:p-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <SectionHeading
          eyebrow="Projects"
          title="Projects I’ve Worked On"
          description="A curated selection of desktop and mobile projects that reflect my focus on practical solutions, clean execution, and useful real-world software."
        />

        {error ? (
          <div className="border border-amber-400/20 bg-amber-500/8 px-5 py-4 text-sm text-amber-200">
            {error} Showing local fallback content instead.
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => <ProjectCardSkeleton key={index} />)
            : projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
        </div>
      </div>
      </div>
    </section>
  );
}
