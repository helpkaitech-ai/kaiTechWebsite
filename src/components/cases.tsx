"use client";

import { motion } from "framer-motion";

const cases = [
  {
    title: "Educator toolkit",
    desc: "Lesson planning with AI assistants and rubric builders.",
  },
  {
    title: "Small business ops",
    desc: "Inbox triage, quotes, and SOP drafting with AI.",
  },
  {
    title: "Content studio",
    desc: "Script outlines and image ideation for social.",
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-semibold">Case studies</h2>
          <span className="text-sm text-muted">Simple examples with measurable impact</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur"
            >
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
