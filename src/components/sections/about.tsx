"use client";

import { motion } from "framer-motion";

import { aboutHighlights, siteConfig, skillGroups, timeline } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl rounded-[36px] border border-blue-400/12 bg-[linear-gradient(180deg,rgba(37,99,235,0.10),rgba(8,17,32,0.22))] p-8 md:p-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <SectionHeading
          eyebrow="About"
          title="About Me"
          description="A focused software developer with growing experience across desktop tools, mobile apps, and practical solution building."
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-5">
              {aboutHighlights.map((item) => (
                <p key={item} className="max-w-3xl text-lg leading-8 text-slate-200">
                  {item}
                </p>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {timeline.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-blue-400/12 bg-white/6 p-5 backdrop-blur"
                >
                  <p className="text-sm font-medium text-sky-300">{item.period}</p>
                  <h4 className="mt-2 text-lg font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-slate-400">{item.organization}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="grid gap-6"
          >
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-3xl border border-blue-400/12 bg-[#0d1930]/80 p-6">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-blue-400" />
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                    {group.title}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-blue-400/12 bg-white/6 px-3 py-1.5 text-sm text-slate-200 transition hover:border-sky-400/25 hover:text-sky-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
}
