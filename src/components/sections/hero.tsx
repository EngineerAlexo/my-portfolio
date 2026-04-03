"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Code2 } from "lucide-react";
import { useState } from "react";

import { heroCtas, siteConfig } from "@/data/site";

export function HeroSection() {
  const [profileImageSrc, setProfileImageSrc] = useState<string>(siteConfig.profileImage);

  return (
    <section id="home" className="px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-9"
        >
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-sm font-medium text-sky-200">
              Available for internships and collaboration
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Hi, I&apos;m <span className="text-sky-300">{siteConfig.fullName}</span>
            </h1>
            <p className="text-lg font-medium text-slate-200 md:text-xl">{siteConfig.role}</p>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              I build modern, practical, and reliable software experiences across desktop, mobile, and web with
              a strong focus on clean execution, usability, and real value.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {heroCtas.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                className={
                  cta.variant === "primary"
                    ? "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_-20px_rgba(37,99,235,0.85)] transition hover:-translate-y-0.5 hover:from-sky-400 hover:to-blue-500"
                    : "inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-sky-400/25 hover:text-sky-300"
                }
              >
                {cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-sky-300"
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-sky-300"
            >
              <BriefcaseBusiness className="h-4 w-4" />
              Contact
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {siteConfig.heroStats.map((item) => (
              <div
                key={item.label}
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur"
              >
                <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-sky-500/14" />
                <p className="text-2xl font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/15" />
            <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/15" />
            <div className="relative mx-auto flex h-[24rem] w-[24rem] items-center justify-center rounded-full border border-white/12 bg-white/5 backdrop-blur">
              <div className="absolute inset-5 rounded-full border border-sky-400/20" />
              <div className="absolute -left-2 top-14 h-14 w-14 rounded-full bg-sky-500/12 blur-md" />
              <div className="absolute -right-2 bottom-16 h-16 w-16 rounded-full bg-cyan-400/12 blur-md" />
              <div className="relative h-[19rem] w-[19rem] overflow-hidden rounded-full border-4 border-sky-300/20 bg-slate-900">
                <Image
                  src={profileImageSrc}
                  alt={siteConfig.fullName}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 24rem, 80vw"
                  onError={() => setProfileImageSrc("/profile-photo.svg")}
                />
              </div>
            </div>
            <div className="mx-auto mt-6 max-w-sm rounded-[24px] border border-sky-400/12 bg-white/6 px-5 py-4 text-center backdrop-blur">
              <p className="text-base font-semibold text-white">{siteConfig.fullName}</p>
              <p className="mt-1 text-sm text-slate-300">Desktop & Mobile Developer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
