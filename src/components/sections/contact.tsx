"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Code2, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { siteConfig } from "@/data/site";
import { submitContactMessage } from "@/lib/firebase/firestore";
import { contactSchema, type ContactSchema } from "@/lib/validators/contact";
import { SectionHeading } from "@/components/ui/section-heading";

export function ContactSection() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerMessage(null);

    try {
      await submitContactMessage(values);
      setServerMessage("Message sent successfully. I will get back to you soon.");
      reset();
    } catch (error) {
      setServerMessage(error instanceof Error ? error.message : "Unable to send the message right now.");
    }
  });

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto rounded-[36px] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(6,182,212,0.10),rgba(8,17,32,0.22))] p-8 md:p-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-8"
        >
          <SectionHeading
            eyebrow="Contact"
            title="Let’s Work Together"
            description="Feel free to reach out for collaboration, projects, internships, or opportunities. I’m always open to building useful software and connecting with great people."
          />

          <div className="rounded-[28px] border border-cyan-400/12 bg-white/6 p-6 backdrop-blur">
            <div className="grid gap-5">
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p className="text-sm text-slate-300">{siteConfig.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-white">Location</p>
                  <p className="text-sm text-slate-300">{siteConfig.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <p className="text-sm text-slate-300">{siteConfig.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <Code2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-white">GitHub</p>
                  <a
                    href={siteConfig.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-slate-300 hover:text-cyan-300"
                  >
                    {siteConfig.githubUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1 }}
          onSubmit={onSubmit}
          className="space-y-5 rounded-[28px] border border-cyan-400/12 bg-[#0d1930]/82 p-8 shadow-[0_20px_70px_-45px_rgba(6,182,212,0.25)] backdrop-blur"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-200">
                Name
              </label>
              <input
                id="name"
                {...register("name")}
                className="w-full rounded-2xl border border-cyan-400/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/35 focus:bg-white/10"
                placeholder="Your name"
              />
              <p className="text-xs text-rose-500">{errors.name?.message ?? " "}</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full rounded-2xl border border-cyan-400/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/35 focus:bg-white/10"
                placeholder="you@example.com"
              />
              <p className="text-xs text-rose-500">{errors.email?.message ?? " "}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-200">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              {...register("message")}
              className="w-full rounded-2xl border border-cyan-400/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/35 focus:bg-white/10"
              placeholder="Your message"
            />
            <p className="text-xs text-rose-500">{errors.message?.message ?? " "}</p>
          </div>

          {serverMessage ? (
            <div className="rounded-2xl border border-cyan-400/12 bg-white/6 px-4 py-3 text-sm text-slate-200">
              {serverMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:from-cyan-400 hover:to-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send Message
          </button>
        </motion.form>
      </div>
      </div>
    </section>
  );
}
