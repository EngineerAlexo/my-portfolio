"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section))
      .forEach((section) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          },
          {
            rootMargin: "-40% 0px -45% 0px",
            threshold: 0.1,
          },
        );

        observer.observe(section);
        observers.push(observer);
      });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
