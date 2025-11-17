"use client";

import { motion } from "framer-motion";

const workshops = [
  {
    title: "AI Essentials for Everyone",
    bullets: [
      "Core concepts in plain language",
      "Prompt patterns that work",
      "Hands-on with top tools",
    ],
  },
  {
    title: "AI for Business Productivity",
    bullets: [
      "Email, docs, and spreadsheet superpowers",
      "Meeting notes to action plans",
      "Safe usage and governance",
    ],
  },
  {
    title: "Prompting Masterclass + Safety",
    bullets: [
      "Role, context, constraints, examples",
      "Refinement loops",
      "Privacy and reliability basics",
    ],
  },
];

export default function Workshops() {
  return (
    <section id="workshops" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-semibold">Workshops</h2>
          <span className="text-sm text-muted">Live, hands-on, and outcome-focused</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {workshops.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur"
            >
              <h3 className="text-lg font-semibold">{w.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {w.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
